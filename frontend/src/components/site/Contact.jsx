import { Mail, MapPin, MessageCircle } from "lucide-react";
import { CARHIRE } from "@/constants/testIds";

export default function Contact() {
  return (
    <section id="contact" data-testid={CARHIRE.contactSection} className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0B0B0B] font-semibold mb-3">
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
              href="https://wa.me/27744634514?text=Hi%20Levah%2C%20I%27d%20like%20to%20hire%20a%20car"
              target="_blank"
              rel="noreferrer"
              data-testid={CARHIRE.contactPhone}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#EFEAE0] border border-[#E7E2D8] grid place-items-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">WhatsApp / Call</div>
                <div className="font-data font-semibold text-lg flex items-center gap-2">
                  074 463 4514
                  <span className="text-[10px] uppercase tracking-wider bg-[#25D366]/15 text-[#1eb858] rounded-full px-2 py-0.5 font-semibold">
                    Tap to chat
                  </span>
                </div>
              </div>
            </a>

            <a
              href="mailto:levah.shibambu@gmail.com"
              data-testid={CARHIRE.contactEmail}
              className="flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#EFEAE0] border border-[#E7E2D8] grid place-items-center text-[#0B0B0B] group-hover:bg-[#0B0B0B] group-hover:text-[#F5F2EA] transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">Email</div>
                <div className="font-data font-semibold text-base break-all">levah.shibambu@gmail.com</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#EFEAE0] border border-[#E7E2D8] grid place-items-center text-[#0B0B0B]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-[#4A4A4A]">Location</div>
                <div className="font-medium">Xikukwani village, Giyani · Limpopo</div>
              </div>
            </div>
          </div>

          {/* QR — Save contact / open WhatsApp */}
          <div
            data-testid="contact-qr-card"
            className="mt-8 rounded-2xl border border-[#E7E2D8] bg-white p-5 shadow-sm flex items-center gap-5"
          >
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&color=1A1A1A&bgcolor=FFFFFF&data=${encodeURIComponent(
                "BEGIN:VCARD\nVERSION:3.0\nFN:Property Car Hire\nORG:Property Car Hire\nTEL;TYPE=CELL,VOICE:+27744634514\nEMAIL:levah.shibambu@gmail.com\nADR;TYPE=WORK:;;Xikukwani Village;Giyani;Limpopo;;South Africa\nURL:https://wa.me/27744634514\nEND:VCARD"
              )}`}
              alt="Scan to save Property Car Hire contact"
              className="h-28 w-28 rounded-lg border border-[#E7E2D8] bg-white shrink-0"
              loading="lazy"
            />
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#0B0B0B] font-semibold mb-1">
                Save us · 1 tap
              </div>
              <div className="font-display text-xl leading-tight">Scan to save our contact</div>
              <p className="text-sm text-[#4A4A4A] mt-1">
                Point your camera. Saves Levah&rsquo;s number, email &amp; WhatsApp directly to your phone.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl overflow-hidden border border-[#E7E2D8] shadow-sm bg-white">
            <iframe
              title="Property Car Hire location"
              src="https://www.google.com/maps?q=Xikukwani+Giyani+Limpopo&output=embed"
              className="w-full h-[420px] md:h-[520px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 rounded-xl bg-[#EFEAE0] border border-[#E7E2D8] p-4 text-sm text-[#4A4A4A]">
            <span className="font-semibold text-[#1A1A1A]">Business reg:</span>
            <span className="font-data ml-2">2013/15052/07</span>
            <span className="mx-3 text-[#E7E2D8]">|</span>
            <span className="font-semibold text-[#1A1A1A]">Hours:</span>
            <span className="ml-2">Mon – Sun · 07:00 – 20:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
