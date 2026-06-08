import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { format, addDays } from "date-fns";
import { Calendar as CalIcon, Loader2, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CARS, getCarById, SEDANS, SUVS } from "@/lib/cars";
import { calculateQuote, formatZAR } from "@/lib/pricing";
import { CARHIRE } from "@/constants/testIds";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BookingForm({ prefillCarId }) {
  const today = useMemo(() => new Date(), []);
  const [carId, setCarId] = useState("");
  const [pickup, setPickup] = useState(null);
  const [ret, setRet] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState(null);

  useEffect(() => {
    if (prefillCarId) setCarId(prefillCarId);
  }, [prefillCarId]);

  const quote = useMemo(() => {
    if (!pickup || !ret) return null;
    return calculateQuote(pickup.toISOString(), ret.toISOString());
  }, [pickup, ret]);

  const selectedCar = getCarById(carId);

  const canSubmit =
    carId && pickup && ret && quote && name.trim().length > 1 && phone.trim().length >= 7 && /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        full_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        car_id: selectedCar.id,
        car_name: selectedCar.name,
        pickup_date: format(pickup, "yyyy-MM-dd"),
        return_date: format(ret, "yyyy-MM-dd"),
        notes: notes.trim(),
      };
      const { data } = await axios.post(`${API}/bookings`, payload);
      setSuccessId(data.id);
      toast.success("Booking request sent!", {
        description: data.email_sent
          ? "Levah has been notified by email. He'll call you shortly."
          : "Saved! Please also WhatsApp 074 463 4514 so Levah can confirm faster.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Could not send booking", {
        description: err?.response?.data?.detail || "Please try again or call 074 463 4514.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccessId(null);
    setName(""); setPhone(""); setEmail(""); setNotes("");
    setPickup(null); setRet(null); setCarId("");
  };

  return (
    <section id="booking" data-testid={CARHIRE.bookingSection} className="py-20 md:py-28 relative">
      <div className="absolute top-20 right-0 w-80 h-80 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B] font-semibold mb-3">
            Get a quote · Book a car
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Tell us your trip. <span className="italic text-[#84CC16] [text-shadow:0_1px_0_#0B0B0B]">Get your price.</span>
          </h2>
          <p className="mt-4 text-[#4A4A4A] max-w-md">
            Pick your car and dates — we&rsquo;ll calculate your quote instantly. Submit the form
            and Levah will confirm directly with you on call or WhatsApp.
          </p>

          <div className="mt-8 rounded-2xl bg-white border border-[#E7E2D8] shadow-sm p-6 md:p-7">
            <div className="text-xs uppercase tracking-[0.18em] text-[#4A4A4A] mb-3">
              <Sparkles className="inline h-3.5 w-3.5 text-[#84CC16] mr-1" />
              Your instant quote
            </div>
            {!quote ? (
              <div className="text-[#4A4A4A] text-sm font-data" data-testid={CARHIRE.bookingQuote}>
                Pick your dates to see the price.
              </div>
            ) : (
              <div data-testid={CARHIRE.bookingQuote} className="font-data">
                <div className="flex items-baseline gap-2">
                  <div className="font-display text-5xl text-[#1A1A1A]">{formatZAR(quote.total_upfront)}</div>
                  <div className="text-xs text-[#4A4A4A] uppercase tracking-wider">total upfront</div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <Row label={quote.breakdown} value={formatZAR(quote.rental_cost)} />
                  <Row label="Refundable deposit" value={formatZAR(quote.deposit)} />
                  <div className="warm-divider my-2" />
                  <Row label="Total to bring" value={formatZAR(quote.total_upfront)} bold />
                </div>
                {quote.is_weekend_package && (
                  <div className="mt-4 rounded-lg bg-[#EFEAE0] border border-[#E7E2D8] px-3 py-2 text-xs text-[#1F1F1F]">
                    Weekend package auto-applied — best price for Fri→Mon trips.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          {successId ? (
            <SuccessCard id={successId} onReset={resetForm} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white border border-[#E7E2D8] shadow-sm p-6 md:p-8 space-y-5"
            >
              {/* Car */}
              <div>
                <Label className="text-sm font-semibold">Choose your car</Label>
                <Select value={carId} onValueChange={setCarId}>
                  <SelectTrigger
                    data-testid={CARHIRE.bookingCarSelect}
                    className="mt-1.5 h-12 rounded-xl bg-white border-[#E7E2D8] font-data"
                  >
                    <SelectValue placeholder="Select a vehicle…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sedans &amp; Hatchbacks</SelectLabel>
                      {SEDANS.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>SUVs</SelectLabel>
                      {SUVS.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePickerField
                  label="Pickup date"
                  date={pickup}
                  onChange={(d) => {
                    setPickup(d);
                    if (ret && d && ret <= d) setRet(addDays(d, 1));
                  }}
                  disabledBefore={today}
                  testId={CARHIRE.bookingPickupBtn}
                />
                <DatePickerField
                  label="Return date"
                  date={ret}
                  onChange={setRet}
                  disabledBefore={pickup ? addDays(pickup, 1) : today}
                  testId={CARHIRE.bookingReturnBtn}
                />
              </div>

              {/* Personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Full name</Label>
                  <Input
                    data-testid={CARHIRE.bookingName}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="As on your driver's licence"
                    className="mt-1.5 h-12 rounded-xl bg-white border-[#E7E2D8] font-data"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold">Phone</Label>
                  <Input
                    data-testid={CARHIRE.bookingPhone}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                    inputMode="tel"
                    className="mt-1.5 h-12 rounded-xl bg-white border-[#E7E2D8] font-data"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold">Email</Label>
                <Input
                  data-testid={CARHIRE.bookingEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="mt-1.5 h-12 rounded-xl bg-white border-[#E7E2D8] font-data"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">Notes (optional)</Label>
                <Textarea
                  data-testid={CARHIRE.bookingNotes}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything we should know? e.g. pickup time, destination, special requests."
                  className="mt-1.5 rounded-xl bg-white border-[#E7E2D8] min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                data-testid={CARHIRE.bookingSubmit}
                disabled={!canSubmit || submitting}
                className="w-full h-13 py-4 rounded-full bg-[#0B0B0B] hover:bg-[#1F1F1F] text-[#F5F2EA] text-base shadow-md disabled:opacity-50 disabled:hover:translate-y-0 hover:-translate-y-0.5 transition-all"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Sending request…</>
                ) : (
                  <>Submit booking request</>
                )}
              </Button>
              <p className="text-xs text-[#4A4A4A] text-center">
                By submitting you agree to our rental terms below. Levah will confirm by call or WhatsApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-[#4A4A4A]"}>{label}</span>
      <span className={bold ? "font-bold text-[#0B0B0B]" : "text-[#1A1A1A]"}>{value}</span>
    </div>
  );
}

function DatePickerField({ label, date, onChange, disabledBefore, testId }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Label className="text-sm font-semibold">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            data-testid={testId}
            variant="outline"
            className={`mt-1.5 w-full h-12 justify-start rounded-xl bg-white border-[#E7E2D8] font-data text-left ${
              !date ? "text-[#4A4A4A]" : "text-[#1A1A1A]"
            }`}
          >
            <CalIcon className="mr-2 h-4 w-4 text-[#0B0B0B]" />
            {date ? format(date, "EEE, dd MMM yyyy") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0 bg-white border-[#E7E2D8]">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => { onChange(d); setOpen(false); }}
            disabled={(d) => disabledBefore && d < new Date(disabledBefore.setHours(0,0,0,0))}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SuccessCard({ id, onReset }) {
  return (
    <div
      data-testid={CARHIRE.bookingSuccess}
      className="rounded-2xl bg-white border border-[#3D7A5D]/30 shadow-sm p-8 md:p-10 text-center"
    >
      <div className="mx-auto h-16 w-16 rounded-full bg-[#3D7A5D]/10 grid place-items-center">
        <CheckCircle2 className="h-8 w-8 text-[#3D7A5D]" />
      </div>
      <h3 className="font-display text-3xl mt-5">Booking request received</h3>
      <p className="text-[#4A4A4A] mt-3 max-w-md mx-auto">
        Thanks! Levah from Property Car Hire has been notified. You&rsquo;ll get a call or
        WhatsApp on your number within a few hours to confirm.
      </p>
      <div className="mt-4 inline-block rounded-full bg-[#EFEAE0] px-4 py-1.5 font-data text-sm">
        Ref: <span className="font-semibold">{id.slice(0, 8).toUpperCase()}</span>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href="https://wa.me/27744634514"
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#25D366] text-white px-5 h-11 inline-flex items-center font-medium hover:bg-[#1eb858] transition-colors"
        >
          Message on WhatsApp
        </a>
        <Button variant="outline" onClick={onReset} className="rounded-full border-[#1A1A1A] h-11 px-5">
          Book another car
        </Button>
      </div>
    </div>
  );
}
