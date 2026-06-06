import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Settings2, ArrowRight } from "lucide-react";
import { SEDANS, SUVS } from "@/lib/cars";
import { CARHIRE } from "@/constants/testIds";

export default function Fleet({ onBookCar }) {
  const [tab, setTab] = useState("sedans");

  return (
    <section id="fleet" data-testid={CARHIRE.fleetSection} className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[#B65F33] font-semibold mb-3">
              Our Fleet
            </div>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight max-w-2xl">
              Sedans for the city. SUVs for the road less travelled.
            </h2>
          </div>
          <p className="text-[#4A4A4A] max-w-md text-base">
            Every car is serviced, clean, fuelled up and ready to roll. Tap a car to start
            a booking and see your instant quote.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="bg-[#F2EBE1] border border-[#E5DCD0] rounded-full p-1 h-12">
            <TabsTrigger
              data-testid={CARHIRE.fleetTabSedans}
              value="sedans"
              className="rounded-full px-6 h-10 data-[state=active]:bg-[#B65F33] data-[state=active]:text-[#F9F6F0]"
            >
              Sedans &amp; Hatchbacks · {SEDANS.length}
            </TabsTrigger>
            <TabsTrigger
              data-testid={CARHIRE.fleetTabSuvs}
              value="suvs"
              className="rounded-full px-6 h-10 data-[state=active]:bg-[#B65F33] data-[state=active]:text-[#F9F6F0]"
            >
              SUVs · {SUVS.length}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sedans" className="mt-10">
            <CarGrid cars={SEDANS} onBookCar={onBookCar} />
          </TabsContent>
          <TabsContent value="suvs" className="mt-10">
            <CarGrid cars={SUVS} onBookCar={onBookCar} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

function CarGrid({ cars, onBookCar }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car, i) => (
        <article
          key={car.id}
          data-testid={CARHIRE.carCard(car.id)}
          className="group rounded-2xl bg-white border border-[#E5DCD0] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="relative h-52 overflow-hidden bg-[#F2EBE1]">
            <img
              src={car.image}
              alt={car.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-3 left-3 rounded-full bg-[#1A1A1A]/85 backdrop-blur text-[#F9F6F0] px-3 py-1 text-[10px] uppercase tracking-wider">
              {car.tag}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl leading-tight">{car.name}</h3>
              <div className="text-right shrink-0">
                <div className="text-[10px] uppercase tracking-wider text-[#4A4A4A]">from</div>
                <div className="font-data font-bold text-lg text-[#B65F33]">R499<span className="text-xs text-[#4A4A4A]">/day</span></div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-[#4A4A4A]">
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {car.seats}</span>
              <span className="flex items-center gap-1"><Settings2 className="h-3.5 w-3.5" /> {car.transmission}</span>
              <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" /> {car.fuel}</span>
            </div>

            <Button
              data-testid={CARHIRE.carCardBookBtn(car.id)}
              onClick={() => onBookCar(car.id)}
              variant="outline"
              className="mt-5 w-full rounded-full border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F9F6F0] h-11 transition-all group/btn"
            >
              Book this car <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
