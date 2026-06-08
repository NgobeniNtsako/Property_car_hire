import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Star, ShieldCheck } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

const HERO_IMG = "https://images.pexels.com/photos/16975390/pexels-photo-16975390.jpeg";

export default function Hero({ onBook }) {
  return (
    <section id="top" className="relative pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      {/* Decorative side accent */}
      <div className="absolute top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#84CC16]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-[420px] h-[420px] rounded-full bg-[#0B0B0B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EFEAE0] border border-[#E7E2D8] px-3 py-1.5 text-xs font-medium text-[#1F1F1F] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3D7A5D] animate-pulse" />
            Now available in Giyani · Xikukwani village
          </div>

          <h1
            data-testid={CARHIRE.heroHeading}
            className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight"
          >
            Premium <span className="italic text-[#84CC16] [text-shadow:0_1px_0_#0B0B0B]">car hire</span> in Giyani —
            <br className="hidden md:block" />
            ready when you are.
          </h1>

          <p className="mt-5 text-base md:text-lg text-[#4A4A4A] max-w-xl">
            From quick city runs to weekend getaways across Limpopo. Choose your car,
            pick your dates, and get an instant quote — booked straight with Levah from
            Property Car Hire.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              data-testid={CARHIRE.heroCtaBook}
              onClick={onBook}
              className="rounded-full bg-[#0B0B0B] hover:bg-[#1F1F1F] text-[#F5F2EA] px-6 h-12 text-base shadow-md hover:-translate-y-0.5 transition-all"
            >
              Get instant quote <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <a
              href="https://wa.me/27744634514?text=Hi%20Levah%2C%20I%27d%20like%20to%20hire%20a%20car"
              target="_blank"
              rel="noreferrer"
              className="contents"
            >
              <Button
                data-testid={CARHIRE.heroCtaCall}
                variant="outline"
                className="rounded-full border-[#1A1A1A] text-[#1A1A1A] bg-transparent hover:bg-[#25D366] hover:text-white hover:border-[#25D366] h-12 px-6 text-base transition-all"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" /> WhatsApp 074 463 4514
              </Button>
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat label="From" value="R499" sub="per day" />
            <Stat label="Weekend" value="R3000" sub="Fri – Mon 10am" />
            <Stat label="Deposit" value="R1000" sub="refundable" />
          </div>
        </div>

        <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E7E2D8]">
            <img
              src={HERO_IMG}
              alt="Car ready for hire in Giyani, Limpopo"
              className="w-full h-[420px] md:h-[560px] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A]/35 via-[#1A1A1A]/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <div className="rounded-2xl bg-[#F5F2EA]/95 backdrop-blur-md border border-white/40 px-4 py-3 shadow-lg">
                <div className="flex items-center gap-1 text-[#84CC16]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <div className="text-xs font-medium mt-0.5">Trusted by Giyani locals</div>
              </div>
              <div className="rounded-2xl bg-[#1A1A1A]/85 backdrop-blur-md text-[#F5F2EA] px-4 py-3 shadow-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#84CC16]" />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#F5F2EA]/70">Tracker + Dashcam</div>
                  <div className="text-sm font-semibold">24/7 protected</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini-card */}
          <div className="hidden md:block absolute -left-6 top-10 animate-gentle-float">
            <div className="rounded-2xl bg-white shadow-xl border border-[#E7E2D8] px-4 py-3 text-sm">
              <div className="text-[10px] uppercase tracking-wider text-[#0B0B0B] font-semibold">Reg</div>
              <div className="font-data font-semibold">2013/15052/07</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, sub }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#4A4A4A]">{label}</div>
      <div className="font-display text-2xl mt-1 text-[#1A1A1A]">{value}</div>
      <div className="text-xs text-[#4A4A4A]">{sub}</div>
    </div>
  );
}
