// Fleet data. Images sourced from design guidelines (Unsplash/Pexels).
export const toyota_rumion= "/images/toyota_Rumion.png";
export const polo_vivo = "/images/polo_vivo.png";
export const toyota_etios = "/images/toyota_atios.png";
export const kia_pesga = "/images/kia_Pegas.png";
export const kia_rio = "/images/kia_rio.png";
export const corolla_quest= "/images/toyotal_corolla.png";
export const nissan_almera= "/images/nissan_almera.png";
export const suzuki_ertiga = "/images/suzuki_Ertiga.png";
export const suzuki_swift= "/images/suzuki_swift.png";
export const suzuki_celerio = "/images/suzuki_celeroi.png";


export const CARS = [
  // Sedans / Hatchbacks
  { id: "toyota-rumion", name: "Toyota Rumion", category: "sedan", seats: 7, transmission: "Manual", fuel: "Petrol", image: toyota_rumion, tag: "Family Favourite" },
  { id: "polo-vivo", name: "Polo Vivo", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: polo_vivo, tag: "Fuel Saver" },
  { id: "toyota-etios", name: "Toyota Etios", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: toyota_etios, tag: "Reliable" },
  { id: "kia-pesga", name: "Kia Pegas", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: kia_pesga, tag: "Comfortable" },
  { id: "kia-rio", name: "Kia Rio", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: kia_rio, tag: "City Smart" },
  { id: "corolla-quest", name: "Corolla Quest", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: corolla_quest, tag: "Best Seller" },
  { id: "nissan-almera", name: "Nissan Almera", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: nissan_almera, tag: "Spacious" },
  { id: "suzuki-ertiga", name: "Suzuki Ertiga", category: "sedan", seats: 7, transmission: "Manual", fuel: "Petrol", image: suzuki_ertiga, tag: "7-Seater" },
  { id: "suzuki-swift", name: "Suzuki Swift", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: suzuki_swift, tag: "Nimble" },
  { id: "suzuki-celerio", name: "Suzuki Celerio", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: suzuki_celerio, tag: "Economy" },

  // SUVs
  { id: "ford-kuga", name: "Ford Kuga", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: toyota_rumion, tag: "Adventure Ready" },
  { id: "toyota-rav4", name: "Toyota RAV4", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: toyota_rumion, tag: "All-Terrain" },
  { id: "mercedes-v-class", name: "Mercedes-Benz V-Class", category: "suv", seats: 7, transmission: "Automatic", fuel: "Diesel", image: toyota_rumion, tag: "Luxury" },
  { id: "haval-gt", name: "Haval GT", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: toyota_rumion, tag: "Modern" },
];

export const SEDANS = CARS.filter((c) => c.category === "sedan");
export const SUVS = CARS.filter((c) => c.category === "suv");

export const getCarById = (id) => CARS.find((c) => c.id === id);
