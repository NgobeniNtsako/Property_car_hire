# Property Driving School Car Hire — PRD

## Original Problem Statement
Build a car hire website for **Property Driving School Car Hire** based in Giyani (Xikukwani village), South Africa. Visitors should browse cars, specify rental dates, get an instant smart quote, and submit booking requests that email `levah.shibambu@gmail.com`. Phone: `0744634514`. Strong local SEO ("car hire Giyani"). Professional, creative design.

## Business
- Reg: 2013/15052/07
- Pricing: R499 weekday/day · R3000 weekend package (Fri–Mon 10am) · R1000 refundable deposit
- Rules: 120 km/h limit, hirer-only driver, in-province only (unless notified), R150/hr late fee, 24/7 tracker + dashcam, full tank in/out

## User Personas
1. **Giyani local** searching "car hire Giyani" needing a daily/weekend rental
2. **Weekend traveller** wanting the Fri–Mon package for a Limpopo trip
3. **Out-of-town visitor** needing an SUV (RAV4, Kuga, V-Class, Haval GT)
4. **Driving-school customer** referred by Levah for personal hire

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn/ui (Outfit body, DM Serif Display headings, Manrope for data). Single-page (`/`) with Hero, Trust, Fleet, Pricing, BookingForm, Rules, Contact, Footer + WhatsApp float.
- **Backend**: FastAPI (`/api/*`) — `/quote`, `/bookings`, `/health`. Server-side smart pricing (Friday + ≤3 days = weekend package).
- **DB**: MongoDB — `bookings` collection (id, customer, car, dates, quote, status, email_sent, created_at).
- **Email**: Resend (graceful — bookings save even with empty key).
- **SEO**: meta tags + JSON-LD `AutoRental` structured data with localBusiness fields.

## Core Requirements (static)
- Browse fleet (14 cars: 10 sedans/hatchbacks + 4 SUVs)
- Instant quote on date selection (auto weekend-package detection)
- Booking form → MongoDB + email to owner
- WhatsApp click-to-chat to 0744634514
- Local SEO: title, description, keywords, OG, JSON-LD

## What's Been Implemented (2026-02 — first cut)
- Full single-page site with 8 sections
- 14 cars seeded with stock images, tags, seats, transmission
- Smart server + client pricing (verified by 12 pytest cases)
- Booking form with shadcn Select, Popover + Calendar, Textarea, sonner toasts
- Resend integration wired up (waiting for API key)
- WhatsApp floating button (bottom-left, pulsing)
- Embedded Google Map for Xikukwani · Giyani
- SEO meta + JSON-LD LocalBusiness/AutoRental
- All interactive + key informational elements have `data-testid`
- Testing agent: 100% backend (12/12) + 100% frontend (all critical flows)

## Backlog (next iterations)
**P0**
- User pastes Resend API key → uncomment & restart backend → emails go out

**P1**
- Admin dashboard at `/admin` to view bookings (currently DB-only)
- Confirmation email to customer (not just owner)
- Real photos of actual fleet (replace stock images)

**P2**
- Customer testimonials section
- FAQ accordion
- Multi-language (Xitsonga / English toggle)
- Damage report / driver's licence upload (object storage)
- Calendar availability blocking (can't double-book same car on same dates)
- Stripe / PayFast deposit pre-authorisation
