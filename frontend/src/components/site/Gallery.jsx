import { ArrowUpRight } from "lucide-react";

// Mix of atmospheric driving / car photography
const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70",
    alt: "Sunset highway drive",
    label: "Wide-open Limpopo highways",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=70",
    alt: "Premium sedan on the road",
    label: "Premium sedans",
  },
  {
    src: "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "SUV ready for adventure",
    label: "Built for adventure",
  },
  {
    src: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=900&q=70",
    alt: "Steering wheel close-up",
    label: "Inside the cockpit",
  },
  {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=70",
    alt: "Couple receiving car keys",
    label: "Pickup, signed off",
  },
  {
    src: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Aerial road through landscape",
    label: "Across the province",
    span: "col-span-2",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#84CC16] font-semibold mb-3">
              On the road
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-2xl">
              The journey, the car, the freedom.
            </h2>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B0B0B] hover:text-[#84CC16] transition-colors"
          >
            Start your journey <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[180px_180px_180px] md:grid-rows-[220px_220px] gap-3 md:gap-4">
          {SHOTS.map((shot, i) => (
            <figure
              key={shot.src}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${shot.span ?? ""}`}
              data-testid={`gallery-shot-${i}`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/70 via-transparent to-transparent" />
              <figcaption className="absolute bottom-3 left-3 right-3 text-[#F5F2EA] text-xs md:text-sm font-medium drop-shadow-md">
                {shot.label}
              </figcaption>
              <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-[#84CC16] grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="h-4 w-4 text-[#0B0B0B]" />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
