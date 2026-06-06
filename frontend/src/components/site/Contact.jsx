import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

export default function Contact() {
  return (
    <section id="contact" data-testid={CARHIRE.contactSection} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.22em] text-[#B65F33] font-semibold mb-3">
            Talk to Levah
          </div>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight">
            Local. Reachable. Ready to help.
          </h2>
          <p className="mt-4 text-[#4A4A4A] max-w-md">
            Based in Xikukwani village, Giyani. Reach us on call or WhatsApp — quickest way
            to confirm a booking is a quick message.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="tel:+27744634514"
              data-testid={CARHIRE.contactPhone}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#F2EBE1] border border-[#E5DCD0] grid place-items-center text-[#B65F33] group-hover:bg-[#B65F33] group-hover:text-[#F9F6F0] transition-colors">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">Call</div>
                <div className="font-data font-semibold text-lg">074 463 4514</div>
              </div>
            </a>

            <a
              href="https://wa.me/27744634514"
              target="_blank"
              rel="noreferrer"
              data-testid={CARHIRE.contactWhatsapp}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#F2EBE1] border border-[#E5DCD0] grid place-items-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">WhatsApp</div>
                <div className="font-data font-semibold text-lg">Chat with us</div>
              </div>
            </a>

            <a
              href="mailto:levah.shibambu@gmail.com"
              data-testid={CARHIRE.contactEmail}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#F2EBE1] border border-[#E5DCD0] grid place-items-center text-[#B65F33] group-hover:bg-[#B65F33] group-hover:text-[#F9F6F0] transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">Email</div>
                <div className="font-data font-semibold text-base break-all">levah.shibambu@gmail.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#F2EBE1] border border-[#E5DCD0] grid place-items-center text-[#B65F33]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">Location</div>
                <div className="font-medium">Xikukwani village, Giyani · Limpopo</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden border border-[#E5DCD0] shadow-sm bg-white">
            <iframe
              title="Property Driving School Car Hire location"
              src="https://www.google.com/maps?q=Xikukwani+Giyani+Limpopo&output=embed"
              className="w-full h-[420px] md:h-[520px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 rounded-xl bg-[#F2EBE1] border border-[#E5DCD0] p-4 text-sm text-[#4A4A4A]">
            <span className="font-semibold text-[#1A1A1A]">Business reg:</span>
            <span className="font-data ml-2">2013/15052/07</span>
            <span className="mx-3 text-[#E5DCD0]">|</span>
            <span className="font-semibold text-[#1A1A1A]">Hours:</span>
            <span className="ml-2">Mon – Sun · 07:00 – 20:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
