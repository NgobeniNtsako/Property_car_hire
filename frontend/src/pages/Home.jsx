import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Trust from "@/components/site/Trust";
import Fleet from "@/components/site/Fleet";
import Gallery from "@/components/site/Gallery";
import Pricing from "@/components/site/Pricing";
import BookingForm from "@/components/site/BookingForm";
import Rules from "@/components/site/Rules";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import { useEffect, useState } from "react";

export default function Home() {
  const [prefillCarId, setPrefillCarId] = useState(null);

  useEffect(() => {
    // Inject JSON-LD structured data for local SEO
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AutoRental",
      "name": "Property Car Hire",
      "image": "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      "@id": "https://propertycarhire.co.za",
      "telephone": "+27744634514",
      "email": "levah.shibambu@gmail.com",
      "priceRange": "R499 - R3000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Xikukwani Village",
        "addressLocality": "Giyani",
        "addressRegion": "Limpopo",
        "addressCountry": "ZA",
      },
      "areaServed": ["Giyani", "Xikukwani", "Limpopo"],
      "openingHours": "Mo-Su 07:00-20:00",
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  const handleBookCar = (carId) => {
    setPrefillCarId(carId);
    setTimeout(() => {
      document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EA] text-[#1A1A1A]">
      <Navbar />
      <main>
        <Hero onBook={() => handleBookCar(null)} />
        <Trust />
        <Fleet onBookCar={handleBookCar} />
        <Gallery />
        <Pricing />
        <BookingForm prefillCarId={prefillCarId} />
        <Rules />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
