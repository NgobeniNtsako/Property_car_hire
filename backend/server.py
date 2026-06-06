from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, date


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'levah.shibambu@gmail.com')
OWNER_PHONE = os.environ.get('OWNER_PHONE', '0744634514')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create the main app without a prefix
app = FastAPI(title="Property Driving School Car Hire API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ---------- Pricing logic ----------
WEEKDAY_RATE = 499
WEEKEND_PACKAGE = 3000
DEPOSIT = 1000


def calculate_quote(pickup_iso: str, return_iso: str) -> dict:
    """Calculate a smart quote.

    Rules:
    - If the rental starts on a Friday and ends on or before the following Monday,
      apply the weekend package rate (R3000).
    - Otherwise charge R499 per day (inclusive of pickup day, exclusive of return day,
      rounded up to at least 1 day).
    - Deposit R1000 is shown separately (refundable).
    """
    pickup = datetime.fromisoformat(pickup_iso).date()
    ret = datetime.fromisoformat(return_iso).date()

    if ret <= pickup:
        raise ValueError("Return date must be after pickup date")

    days = (ret - pickup).days
    # Weekend package detection: starts Friday (4) AND return within 3 days (i.e. by Mon)
    is_weekend_pkg = pickup.weekday() == 4 and days <= 3

    if is_weekend_pkg:
        rental_cost = WEEKEND_PACKAGE
        breakdown = f"Weekend package (Fri to Mon 10am)"
    else:
        rental_cost = WEEKDAY_RATE * days
        breakdown = f"{days} day(s) × R{WEEKDAY_RATE}/day"

    total = rental_cost + DEPOSIT

    return {
        "days": days,
        "rental_cost": rental_cost,
        "deposit": DEPOSIT,
        "total_upfront": total,
        "is_weekend_package": is_weekend_pkg,
        "breakdown": breakdown,
        "currency": "ZAR",
    }


# ---------- Models ----------
class QuoteRequest(BaseModel):
    pickup_date: str  # ISO date (YYYY-MM-DD)
    return_date: str


class QuoteResponse(BaseModel):
    days: int
    rental_cost: int
    deposit: int
    total_upfront: int
    is_weekend_package: bool
    breakdown: str
    currency: str


class BookingCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    car_id: str
    car_name: str
    pickup_date: str
    return_date: str
    notes: Optional[str] = ""


class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    car_id: str
    car_name: str
    pickup_date: str
    return_date: str
    notes: str = ""
    quote: dict
    status: str = "pending"
    email_sent: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ---------- Email rendering ----------
def render_booking_email(b: Booking) -> str:
    q = b.quote
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;background:#F9F6F0;padding:24px;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #E5DCD0;">
          <tr><td style="background:#B65F33;color:#ffffff;padding:24px;">
            <h1 style="margin:0;font-size:22px;">New Booking Request</h1>
            <p style="margin:6px 0 0;font-size:14px;opacity:.9;">Property Driving School Car Hire — Giyani</p>
          </td></tr>
          <tr><td style="padding:24px;color:#1A1A1A;">
            <h2 style="margin:0 0 12px;font-size:18px;color:#B65F33;">Customer</h2>
            <p style="margin:0 0 4px;"><strong>Name:</strong> {b.full_name}</p>
            <p style="margin:0 0 4px;"><strong>Phone:</strong> {b.phone}</p>
            <p style="margin:0 0 16px;"><strong>Email:</strong> {b.email}</p>

            <h2 style="margin:16px 0 12px;font-size:18px;color:#B65F33;">Vehicle &amp; Dates</h2>
            <p style="margin:0 0 4px;"><strong>Car:</strong> {b.car_name}</p>
            <p style="margin:0 0 4px;"><strong>Pickup:</strong> {b.pickup_date}</p>
            <p style="margin:0 0 16px;"><strong>Return:</strong> {b.return_date}</p>

            <h2 style="margin:16px 0 12px;font-size:18px;color:#B65F33;">Quote</h2>
            <table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
              <tr><td style="border-bottom:1px solid #E5DCD0;">{q['breakdown']}</td>
                  <td align="right" style="border-bottom:1px solid #E5DCD0;">R{q['rental_cost']}</td></tr>
              <tr><td style="border-bottom:1px solid #E5DCD0;">Refundable deposit</td>
                  <td align="right" style="border-bottom:1px solid #E5DCD0;">R{q['deposit']}</td></tr>
              <tr><td style="font-weight:bold;padding-top:8px;">Total upfront</td>
                  <td align="right" style="font-weight:bold;padding-top:8px;color:#B65F33;">R{q['total_upfront']}</td></tr>
            </table>

            <h2 style="margin:16px 0 12px;font-size:18px;color:#B65F33;">Customer Notes</h2>
            <p style="margin:0;padding:12px;background:#F2EBE1;border-radius:8px;">{b.notes or '— none —'}</p>

            <p style="margin:20px 0 0;font-size:12px;color:#4A4A4A;">Booking ID: {b.id}</p>
            <p style="margin:4px 0 0;font-size:12px;color:#4A4A4A;">Submitted: {b.created_at}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_booking_email(b: Booking) -> bool:
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — skipping email send for booking %s", b.id)
        return False

    params = {
        "from": SENDER_EMAIL,
        "to": [OWNER_EMAIL],
        "reply_to": b.email,
        "subject": f"New car hire request — {b.full_name} — {b.car_name}",
        "html": render_booking_email(b),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend email sent id=%s booking=%s", result.get("id"), b.id)
        return True
    except Exception as e:
        logger.error("Resend send failed for booking %s: %s", b.id, e)
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Property Driving School Car Hire API", "owner_phone": OWNER_PHONE}


@api_router.get("/health")
async def health():
    return {
        "status": "ok",
        "email_configured": bool(RESEND_API_KEY),
        "time": datetime.now(timezone.utc).isoformat(),
    }


@api_router.post("/quote", response_model=QuoteResponse)
async def get_quote(req: QuoteRequest):
    try:
        return calculate_quote(req.pickup_date, req.return_date)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error("Quote error: %s", e)
        raise HTTPException(status_code=400, detail="Invalid dates")


@api_router.post("/bookings", response_model=Booking)
async def create_booking(payload: BookingCreate):
    # Compute quote on server (don't trust client)
    try:
        quote = calculate_quote(payload.pickup_date, payload.return_date)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    booking = Booking(
        full_name=payload.full_name.strip(),
        email=payload.email,
        phone=payload.phone.strip(),
        car_id=payload.car_id,
        car_name=payload.car_name,
        pickup_date=payload.pickup_date,
        return_date=payload.return_date,
        notes=(payload.notes or "").strip(),
        quote=quote,
    )

    # Persist first so nothing is lost even if email fails
    await db.bookings.insert_one(booking.model_dump())

    # Try to send email
    sent = await send_booking_email(booking)
    if sent:
        await db.bookings.update_one({"id": booking.id}, {"$set": {"email_sent": True}})
        booking.email_sent = True

    return booking


@api_router.get("/bookings", response_model=List[Booking])
async def list_bookings(limit: int = 100):
    docs = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
