import { CARHIRE } from "@/constants/testIds";

export default function Footer() {
  return (
    <footer data-testid={CARHIRE.footer} className="bg-[#1A1A1A] text-[#F9F6F0]/80 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#B65F33] grid place-items-center text-[#F9F6F0] font-display text-lg">
                P
              </div>
              <div>
                <div className="font-display text-lg text-[#F9F6F0]">Property Driving School Car Hire</div>
                <div className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">Giyani · Xikukwani</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-[#F9F6F0]/60 max-w-md">
              Locally owned car hire serving Giyani and the wider Limpopo province. Sedans,
              hatchbacks and SUVs from R499/day with refundable deposit.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">Quick links</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#fleet" className="hover:text-[#D4AF37]">Our Fleet</a></li>
              <li><a href="#pricing" className="hover:text-[#D4AF37]">Pricing</a></li>
              <li><a href="#booking" className="hover:text-[#D4AF37]">Book a car</a></li>
              <li><a href="#rules" className="hover:text-[#D4AF37]">Terms</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3">Contact</div>
            <ul className="space-y-2 text-sm font-data">
              <li><a href="tel:+27744634514" className="hover:text-[#D4AF37]">Call: 074 463 4514</a></li>
              <li><a href="https://wa.me/27744634514" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37]">WhatsApp: 074 463 4514</a></li>
              <li><a href="mailto:levah.shibambu@gmail.com" className="hover:text-[#D4AF37]">levah.shibambu@gmail.com</a></li>
              <li className="text-[#F9F6F0]/60">Reg: 2013/15052/07</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-[#F9F6F0]/50">
          <div>© {new Date().getFullYear()} Property Driving School Car Hire. All rights reserved.</div>
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
