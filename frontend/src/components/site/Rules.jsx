import { Gauge, User, MapPin, Clock, Fuel, Camera } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

const RULES = [
  {
    icon: Gauge,
    title: "Speed limit 120 km/h",
    desc: "Stay safe and within the law — your trip is monitored in real time.",
  },
  {
    icon: User,
    title: "Hirer is the only driver",
    desc: "Only the person who hired the vehicle is permitted to drive it.",
  },
  {
    icon: MapPin,
    title: "Stay in-province",
    desc: "Leaving Limpopo requires prior notice. Out-of-province trips priced separately.",
  },
  {
    icon: Clock,
    title: "Return on time",
    desc: "Late returns are billed at R150/hour. Please plan a small buffer.",
  },
  {
    icon: Fuel,
    title: "Full tank out, full tank in",
    desc: "Return the car with the same fuel level — or your deposit covers the shortfall.",
  },
  {
    icon: Camera,
    title: "Tracked &amp; dashcam recorded",
    desc: "Every vehicle is monitored 24/7 by tracker and onboard dashcam.",
  },
];

export default function Rules() {
  return (
    <section id="rules" data-testid={CARHIRE.rulesSection} className="py-20 md:py-28 bg-[#1A1A1A] text-[#F5F2EA] relative overflow-hidden">
      <div className="absolute top-20 -left-20 w-96 h-96 bg-[#0B0B0B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#84CC16] font-semibold mb-3">
            Rental Terms
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Clear rules for a smooth ride.
          </h2>
          <p className="mt-4 text-[#F5F2EA]/70">
            We keep things simple so you can focus on the road. Every car is fully covered,
            tracked, and ready for the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RULES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-[#84CC16]/40 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl grid place-items-center bg-[#84CC16]/15 text-[#84CC16] mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl" dangerouslySetInnerHTML={{ __html: title }} />
              <p className="text-sm mt-2 text-[#F5F2EA]/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
