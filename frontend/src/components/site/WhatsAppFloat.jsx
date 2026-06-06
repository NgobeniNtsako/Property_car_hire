import { MessageCircle } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/27744634514?text=Hi%20Levah%2C%20I%27d%20like%20to%20hire%20a%20car"
      target="_blank"
      rel="noreferrer"
      data-testid={CARHIRE.whatsappFloat}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full wa-pulse" />
      <span className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb858] text-white rounded-full pl-4 pr-5 py-3 shadow-2xl transition-all hover:-translate-y-0.5">
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline text-sm font-semibold">WhatsApp us</span>
      </span>
    </a>
  );
}
