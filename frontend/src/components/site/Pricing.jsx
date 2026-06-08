import { Check, Calendar, CalendarDays, Wallet } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

const cards = [
  {
    id: "weekday",
    icon: Calendar,
    label: "Weekday",
    price: "R499",
    unit: "per day",
    description: "Monday to Friday rentals. Pay only for the days you drive.",
    bullets: ["Min. 1 day", "Includes vehicle, tracker & dashcam", "Refundable deposit added"],
    testId: CARHIRE.pricingWeekday,
    highlight: false,
  },
  {
    id: "weekend",
    icon: CalendarDays,
    label: "Weekend Package",
    price: "R3000",
    unit: "Fri – Mon 10am",
    description: "Best value for getaways. Lock in the whole weekend at one flat rate.",
    bullets: ["From Friday onwards", "Return by Monday 10am", "Auto-applied when you pick the dates"],
    testId: CARHIRE.pricingWeekend,
    highlight: true,
  },
  {
    id: "deposit",
    icon: Wallet,
    label: "Deposit",
    price: "R1000",
    unit: "refundable",
    description: "Refunded in full on vehicle return — clean, full tank, on time.",
    bullets: ["Held during the rental", "Released on return", "Same for every car"],
    testId: CARHIRE.pricingDeposit,
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" data-testid={CARHIRE.pricingSection} className="py-20 md:py-28 bg-[#EFEAE0]/50 border-y border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B] font-semibold mb-3">
            Honest pricing
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            No hidden fees. Just clear, fair rates.
          </h2>
          <p className="mt-4 text-[#4A4A4A]">
            Pick your dates — our system automatically chooses the best rate for you between
            daily and weekend package pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                data-testid={c.testId}
                className={`rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
                  c.highlight
                    ? "bg-[#1A1A1A] text-[#F5F2EA] border-[#1A1A1A] shadow-xl"
                    : "bg-white border-[#E7E2D8] shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`h-11 w-11 rounded-xl grid place-items-center ${
                      c.highlight ? "bg-[#84CC16] text-[#1A1A1A]" : "bg-[#EFEAE0] text-[#0B0B0B]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {c.highlight && (
                    <span className="text-[10px] uppercase tracking-[0.18em] bg-[#84CC16] text-[#1A1A1A] rounded-full px-2.5 py-1 font-semibold">
                      Most popular
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <div className={`text-xs uppercase tracking-[0.2em] ${c.highlight ? "text-[#F5F2EA]/70" : "text-[#4A4A4A]"}`}>
                    {c.label}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <div className="font-display text-5xl">{c.price}</div>
                    <div className={`text-sm ${c.highlight ? "text-[#F5F2EA]/70" : "text-[#4A4A4A]"}`}>
                      {c.unit}
                    </div>
                  </div>
                  <p className={`mt-3 text-sm ${c.highlight ? "text-[#F5F2EA]/80" : "text-[#4A4A4A]"}`}>
                    {c.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${c.highlight ? "text-[#84CC16]" : "text-[#3D7A5D]"}`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
