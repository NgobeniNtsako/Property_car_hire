import { ShieldCheck, Camera, Gauge, Fuel, MapPin, Wallet } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Vehicle tracker" },
  { icon: Camera, label: "Dashcam fitted" },
  { icon: Gauge, label: "120 km/h limit" },
  { icon: Fuel, label: "Full tank policy" },
  { icon: MapPin, label: "Giyani · Xikukwani" },
  { icon: Wallet, label: "R1000 refundable" },
];

export default function Trust() {
  return (
    <section className="py-8 md:py-10 border-y border-[#E7E2D8] bg-[#EFEAE0]/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-[#4A4A4A]">
              <Icon className="h-4 w-4 text-[#0B0B0B]" />
              <span className="text-xs md:text-sm font-medium uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
