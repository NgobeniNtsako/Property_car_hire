"""Backend API tests for Property Driving School Car Hire."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://rent-car-giyani.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# ---------- Health ----------
class TestHealth:
    def test_health_ok_email_not_configured(self):
        r = requests.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        # RESEND_API_KEY intentionally empty
        assert data["email_configured"] is False
        assert "time" in data


# ---------- Quote ----------
class TestQuote:
    def test_quote_weekday_only_three_days(self):
        # 2026-02-09 Mon → 2026-02-12 Thu = 3 days × 499 = 1497 + 1000 deposit
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-09",
            "return_date": "2026-02-12",
        }, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["days"] == 3
        assert d["rental_cost"] == 1497
        assert d["deposit"] == 1000
        assert d["total_upfront"] == 2497
        assert d["is_weekend_package"] is False
        assert d["currency"] == "ZAR"

    def test_quote_weekend_package_fri_to_mon(self):
        # 2026-02-13 Fri → 2026-02-16 Mon = 3 days, weekday(pickup)==4 (Fri)
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-13",
            "return_date": "2026-02-16",
        }, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["is_weekend_package"] is True
        assert d["rental_cost"] == 3000
        assert d["deposit"] == 1000
        assert d["total_upfront"] == 4000

    def test_quote_friday_short_one_day(self):
        # Fri → Sat = 1 day, weekend pkg should apply since days<=3
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-13",
            "return_date": "2026-02-14",
        }, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["is_weekend_package"] is True
        assert d["rental_cost"] == 3000

    def test_quote_friday_long_not_weekend_pkg(self):
        # Fri → Wed next week = 5 days, days>3 so weekday pricing 5*499=2495
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-13",
            "return_date": "2026-02-18",
        }, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["is_weekend_package"] is False
        assert d["days"] == 5
        assert d["rental_cost"] == 5 * 499

    def test_quote_invalid_dates_return_before_pickup(self):
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-12",
            "return_date": "2026-02-09",
        }, timeout=15)
        assert r.status_code == 400

    def test_quote_same_day(self):
        r = requests.post(f"{API}/quote", json={
            "pickup_date": "2026-02-10",
            "return_date": "2026-02-10",
        }, timeout=15)
        assert r.status_code == 400


# ---------- Bookings ----------
class TestBookings:
    def test_create_booking_persists_and_email_not_sent(self):
        payload = {
            "full_name": "TEST_Levah Tester",
            "email": "test_levah@example.com",
            "phone": "0820000000",
            "car_id": "toyota-rumion",
            "car_name": "Toyota Rumion",
            "pickup_date": "2026-02-09",
            "return_date": "2026-02-12",
            "notes": "TEST booking",
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        b = r.json()
        assert b["full_name"] == "TEST_Levah Tester"
        assert b["car_id"] == "toyota-rumion"
        assert b["email_sent"] is False  # RESEND_API_KEY empty
        assert b["status"] == "pending"
        assert "id" in b and len(b["id"]) > 0
        # Server-computed quote (not client trusted)
        q = b["quote"]
        assert q["rental_cost"] == 1497
        assert q["total_upfront"] == 2497
        assert q["is_weekend_package"] is False

        # GET list -> should contain this booking
        r2 = requests.get(f"{API}/bookings", timeout=15)
        assert r2.status_code == 200
        items = r2.json()
        assert any(it["id"] == b["id"] for it in items)
        # Ensure no _id leak from mongo
        for it in items:
            assert "_id" not in it

    def test_create_booking_weekend_package(self):
        payload = {
            "full_name": "TEST_Weekend Person",
            "email": "test_weekend@example.com",
            "phone": "0820000001",
            "car_id": "ford-kuga",
            "car_name": "Ford Kuga",
            "pickup_date": "2026-02-13",
            "return_date": "2026-02-16",
            "notes": "",
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=20)
        assert r.status_code == 200
        b = r.json()
        assert b["quote"]["is_weekend_package"] is True
        assert b["quote"]["rental_cost"] == 3000
        assert b["email_sent"] is False

    def test_create_booking_invalid_dates(self):
        payload = {
            "full_name": "TEST_Invalid",
            "email": "test_invalid@example.com",
            "phone": "0820000002",
            "car_id": "polo-vivo",
            "car_name": "Polo Vivo",
            "pickup_date": "2026-02-12",
            "return_date": "2026-02-09",
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=20)
        assert r.status_code == 400

    def test_create_booking_invalid_email_422(self):
        payload = {
            "full_name": "TEST_BadEmail",
            "email": "not-an-email",
            "phone": "0820000003",
            "car_id": "polo-vivo",
            "car_name": "Polo Vivo",
            "pickup_date": "2026-02-09",
            "return_date": "2026-02-12",
        }
        r = requests.post(f"{API}/bookings", json=payload, timeout=20)
        assert r.status_code == 422

    def test_list_bookings_sorted_desc(self):
        r = requests.get(f"{API}/bookings", timeout=15)
        assert r.status_code == 200
        items = r.json()
        if len(items) >= 2:
            ts = [it["created_at"] for it in items]
            assert ts == sorted(ts, reverse=True)
