// Fleet data. Images sourced from design guidelines (Unsplash/Pexels).
export const SEDAN_IMG_A = "https://images.unsplash.com/photo-1725781535651-e98bbd956179";
export const SEDAN_IMG_B = "https://images.pexels.com/photos/28836714/pexels-photo-28836714.jpeg";
export const SEDAN_IMG_C = "https://images.unsplash.com/photo-1766289004244-99a44544305c";
export const SUV_IMG_A = "https://images.unsplash.com/photo-1469423910081-3488183dd77e";
export const SUV_IMG_B = "https://images.pexels.com/photos/20733767/pexels-photo-20733767.jpeg";
export const SUV_IMG_C = "https://images.unsplash.com/photo-1564188537512-f6bd010d1e2a";

export const CARS = [
  // Sedans / Hatchbacks
  { id: "toyota-rumion", name: "Toyota Rumion", category: "sedan", seats: 7, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_A, tag: "Family Favourite" },
  { id: "polo-vivo", name: "Polo Vivo", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_C, tag: "Fuel Saver" },
  { id: "toyota-etios", name: "Toyota Etios", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_B, tag: "Reliable" },
  { id: "kia-pegas", name: "Kia Pegas", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_A, tag: "Comfortable" },
  { id: "kia-rio", name: "Kia Rio", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_C, tag: "City Smart" },
  { id: "corolla-quest", name: "Corolla Quest", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_B, tag: "Best Seller" },
  { id: "nissan-almera", name: "Nissan Almera", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_A, tag: "Spacious" },
  { id: "suzuki-ertiga", name: "Suzuki Ertiga", category: "sedan", seats: 7, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_B, tag: "7-Seater" },
  { id: "suzuki-swift", name: "Suzuki Swift", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_C, tag: "Nimble" },
  { id: "suzuki-celerio", name: "Suzuki Celerio", category: "sedan", seats: 5, transmission: "Manual", fuel: "Petrol", image: SEDAN_IMG_C, tag: "Economy" },

  // SUVs
  { id: "ford-kuga", name: "Ford Kuga", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: SUV_IMG_A, tag: "Adventure Ready" },
  { id: "toyota-rav4", name: "Toyota RAV4", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: SUV_IMG_A, tag: "All-Terrain" },
  { id: "mercedes-v-class", name: "Mercedes-Benz V-Class", category: "suv", seats: 7, transmission: "Automatic", fuel: "Diesel", image: SUV_IMG_B, tag: "Luxury" },
  { id: "haval-gt", name: "Haval GT", category: "suv", seats: 5, transmission: "Automatic", fuel: "Petrol", image: SUV_IMG_C, tag: "Modern" },
];

export const SEDANS = CARS.filter((c) => c.category === "sedan");
export const SUVS = CARS.filter((c) => c.category === "suv");

export const getCarById = (id) => CARS.find((c) => c.id === id);
