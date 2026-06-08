import { MessageCircle } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

export default function Footer() {
  return (
    <footer data-testid={CARHIRE.footer} className="bg-[#1A1A1A] text-[#F5F2EA]/80 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Property Car Hire logo"
                className="h-16 w-auto object-contain"
                style={{ filter: "invert(1)" }}
              />
            </div>
            <p className="mt-5 text-sm text-[#F5F2EA]/60 max-w-md">
              Locally owned car hire serving Giyani and the wider Limpopo province. Sedans,
              hatchbacks and SUVs from R499/day with refundable deposit.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#84CC16] font-semibold mb-3">Quick links</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#fleet" className="hover:text-[#84CC16]">Our Fleet</a></li>
              <li><a href="#pricing" className="hover:text-[#84CC16]">Pricing</a></li>
              <li><a href="#booking" className="hover:text-[#84CC16]">Book a car</a></li>
              <li><a href="#rules" className="hover:text-[#84CC16]">Terms</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#84CC16] font-semibold mb-3">Contact</div>
            <ul className="space-y-2 text-sm font-data">
              <li><a href="https://wa.me/27744634514?text=Hi%20Levah%2C%20I%27d%20like%20to%20hire%20a%20car" target="_blank" rel="noreferrer" className="hover:text-[#84CC16] inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp: 074 463 4514</a></li>
              <li><a href="mailto:levah.shibambu@gmail.com" className="hover:text-[#84CC16]">levah.shibambu@gmail.com</a></li>
              <li className="text-[#F5F2EA]/60">Reg: 2013/15052/07</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#F5F2EA]/50">
          <div>© {new Date().getFullYear()} Property Car Hire. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Car hire Giyani</span>
            <span>·</span>
            <span>Car rental Limpopo</span>
            <span>·</span>
            <span>Xikukwani car hire</span>
            <span>·</span>
            <span>SUV rental Limpopo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
