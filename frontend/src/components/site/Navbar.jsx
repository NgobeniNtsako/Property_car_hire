import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CARHIRE } from "@/constants/testIds";

const links = [
  { id: "fleet", label: "Our Fleet", testId: CARHIRE.navLinkFleet },
  { id: "pricing", label: "Pricing", testId: CARHIRE.navLinkPricing },
  { id: "rules", label: "Terms", testId: CARHIRE.navLinkRules },
  { id: "contact", label: "Contact", testId: CARHIRE.navLinkContact },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#F9F6F0]/90 backdrop-blur-lg border-b border-[#E5DCD0]" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid={CARHIRE.navLogo}
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="h-9 w-9 rounded-full bg-[#B65F33] grid place-items-center text-[#F9F6F0] font-display text-lg shadow-sm">
            P
          </div>
          <div className="leading-tight">
            <div className="font-display text-[15px] md:text-base">Property Driving School</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#B65F33]">Car Hire · Giyani</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={l.testId}
              onClick={() => go(l.id)}
              className="text-sm font-medium text-[#1A1A1A]/80 hover:text-[#B65F33] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/27744634514?text=Hi%20Levah%2C%20I%27d%20like%20to%20hire%20a%20car"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-data font-semibold text-[#1A1A1A] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4 text-[#25D366]" /> 074 463 4514
          </a>
          <Button
            data-testid={CARHIRE.navBookNow}
            onClick={() => go("booking")}
            className="rounded-full bg-[#B65F33] hover:bg-[#9E4F28] text-[#F9F6F0] px-5 shadow-sm hover:-translate-y-0.5 transition-all"
          >
            Book Now
          </Button>
        </div>

        <button
          aria-label="Open menu"
          className="md:hidden p-2 rounded-lg hover:bg-[#F2EBE1]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#F9F6F0] border-t border-[#E5DCD0] px-4 py-4 space-y-2">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`mobile-${l.testId}`}
              onClick={() => go(l.id)}
              className="block w-full text-left py-2 text-base font-medium"
            >
              {l.label}
            </button>
          ))}
          <Button
            onClick={() => go("booking")}
            className="w-full mt-2 rounded-full bg-[#B65F33] hover:bg-[#9E4F28] text-[#F9F6F0]"
          >
            Book Now
          </Button>
        </div>
      )}
    </header>
  );
}
