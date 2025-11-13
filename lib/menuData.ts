// lib/menuData.ts - Comprehensive Menu Overhaul
// === MACARISTAN DÖNER/KEBAB FİYAT ARAŞTIRMASI (2024) ===
// Tál menüler: 3500-5500 Ft | Dürümler: 2000-3000 Ft | Pideler: 3500-4500 Ft | İçecekler: 400-600 Ft

export type MenuCategory =
  | "Gyros Tálak"
  | "Gyros Piták"
  | "Hamburgerek"
  | "Saláták"
  | "Tészták"
  | "Közkedvelt Ételek"
  | "Kebapok és Grillek"
  | "Döner"
  | "Dürüm"
  | "Pide és Lahmacun"
  | "Levesek"
  | "Köretek"
  | "Desszertek"
  | "Italok";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
  rating?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  // === GYROS TÁLAK ===
  {
    id: "gt-01",
    name: "Csirke Gyros Tál",
    price: 3990,
    description: "Gyros tál csirkehússal, friss zöldségekkel és sült krumplival.",
    category: "Gyros Tálak",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpeg",
    rating: 5,
  },
  {
    id: "gt-02", 
    name: "Borjú Gyros Tál",
    price: 4290,
    description: "Gyros tál borjúhússal, friss zöldségekkel és sült krumplival.",
    category: "Gyros Tálak",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Borju-gyros-tal.jpeg",
    rating: 5,
  },
  {
    id: "gt-03",
    name: "Vegyes Gyros Tál", 
    price: 4190,
    description: "Gyros tál csirke- és borjúhússal, friss zöldségekkel.",
    category: "Gyros Tálak",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cifte-doner.png",
    rating: 5,
  },

  // === GYROS PITÁK ===
  {
    id: "gp-01",
    name: "Csirke Gyros Pita",
    price: 1990,
    description: "Gyros pita csirkehússal és friss zöldségekkel.",
    category: "Gyros Piták", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita.jpg",
    rating: 5,
  },
  {
    id: "gp-02",
    name: "Borjú Gyros Pita", 
    price: 2190,
    description: "Gyros pita borjúhússal és friss zöldségekkel.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/borju-gyros-pita.jpeg",
    rating: 5,
  },
  {
    id: "gp-03",
    name: "Gyros Pita Menü",
    price: 2490,
    description: "Gyros pita menü pitaval és körettel.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita-menu.jpeg",
    rating: 5,
  },

  // === HAMBURGEREK ===
  {
    id: "h-01",
    name: "Classic Burger",
    price: 3190,
    description: "Klasszikus hamburger marhahússal, sajttal és friss zöldségekkel.",
    category: "Hamburgerek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/classic-burger.jpeg",
    rating: 4,
  },
  {
    id: "h-02", 
    name: "Sajt Burger",
    price: 3390,
    description: "Hamburger marhahússal és dupla sajttal.",
    category: "Hamburgerek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Sajt-burger.jpeg",
    rating: 5,
  },

  // === SALÁTÁK ===
  {
    id: "s-01",
    name: "Görög Saláta",
    price: 2490,
    description: "Friss görög saláta fetasajttal és olivaolajjal.",
    category: "Saláták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gorog-salata.jpeg", 
    rating: 4,
  },
  {
    id: "s-02",
    name: "Évszakos Saláta",
    price: 1890,
    description: "Friss zöldségekből készült könnyű és frissítő saláta.",
    category: "Saláták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mevsim-salatasi.jpeg",
    rating: 5,
  },

  // === TÉSZTÁK ===
  {
    id: "t-01",
    name: "Bolognai Spagetti", 
    price: 3490,
    description: "Klasszikus bolognai spagetti gazdag húsos szósszal.",
    category: "Tészták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Bolognai spagetti.jpeg",
    rating: 4,
  },

  // === KÖZKEDVELT ÉTELEK ===
  {
    id: "ke-01",
    name: "Rántott Sajt", 
    price: 3290,
    description: "Rántott sajt rizzsel és tartármártással.",
    category: "Közkedvelt Ételek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Rántott sajt rizzsel és tartármártással.jpeg",
    rating: 5,
  },

  // === KEBAPOK ÉS GRILLEK ===
  {
    id: "k-02",
    name: "Adana Kebap",
    price: 4500,
    description: "Különleges fűszerezésű Adana kebap, rizzsel és grillezett zöldségekkel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-03",
    name: "Urfa Kebap",
    price: 4500, 
    description: "Nem csípős, aromás Urfa kebap rizzsel és körettel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-04",
    name: "Beyti Sarma",
    price: 5500,
    description: "Beyti kebap lavasba tekerve joghurttal és vajas öntettel.",
    category: "Kebapok és Grillek", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/beyti-sarma.jpg",
    rating: 5,
  },
  {
    id: "k-05",
    name: "İskender Kebap",
    price: 5200,
    description: "Vajjal és joghurttal gazdagított klasszikus iskender.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender-kebap.jpeg",
    rating: 5,
  },
  {
    id: "k-06",
    name: "Grillezett Köfte",
    price: 3800,
    description: "Grillezett házi készítésű köfte, rizzsel és zöldekkel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara-kofte.jpeg",
    rating: 4,
  },
  {
    id: "k-07",
    name: "Csirke Şiş",
    price: 4200,
    description: "Pácolt csirke şiş rizzsel és salátával.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-porsiyon.jpg",
    rating: 4,
  },
  {
    id: "k-08",
    name: "Çöp Şiş",
    price: 5200,
    description: "Vékony pálcán pácolt hús parázson sütve.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis-porsiyon.jpeg",
    rating: 5,
  },
  {
    id: "k-09",
    name: "Vegyes Grilltál",
    price: 7500,
    description: "Adana, urfa, şiş és köfte keveréke gazdag tálon.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-izgara.jpg",
    rating: 5,
  },

  // === DÖNER ===
  {
    id: "d-01",
    name: "Et Döner Porsiyon",
    price: 4800,
    description: "Válogatott húsokból döner rizzsel és salátával.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg",
    rating: 5,
  },
  {
    id: "d-02",
    name: "Tavuk Döner", 
    price: 4200,
    description: "Csirkadöner rizzsel és körettel.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-doner.jpg",
    rating: 5,
  },
  {
    id: "d-03",
    name: "Çifte Döner",
    price: 5200,
    description: "Marha és csirke döner keveréke.",
    category: "Döner", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cifte-doner.png",
    rating: 5,
  },
  {
    id: "d-04",
    name: "Pilav Üstü Döner",
    price: 4500,
    description: "Ízletes döner rizságyon.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav-ustu-et-doner.jpg", 
    rating: 5,
  },

  // === DÜRÜM ===
  {
    id: "dr-01",
    name: "Adana Dürüm",
    price: 2500,
    description: "Csípős Adana kebap lavasban, friss zöldekkel.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-durum.jpg",
    rating: 5,
  },
  {
    id: "dr-02", 
    name: "Urfa Dürüm",
    price: 2500,
    description: "Urfa kebap lavasban.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-durum.jpeg",
    rating: 4,
  },
  {
    id: "dr-03",
    name: "Köfte Dürüm", 
    price: 2200,
    description: "Grillezett köftével készített dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kofte-durum.jpg",
    rating: 4,
  },
  {
    id: "dr-04",
    name: "Çöp Şiş Dürüm",
    price: 2600,
    description: "Çöp şiş hússal készített dürüm.",
    category: "Dürüm", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis-durum.jpeg",
    rating: 5,
  },
  {
    id: "dr-05",
    name: "Tavuk Şiş Dürüm",
    price: 2400,
    description: "Pácolt csirke şişsel dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-durum.png",
    rating: 5,
  },
  {
    id: "dr-06",
    name: "Döner Dürüm",
    price: 2800,
    description: "Döner lavasban öntettel és zöldekkel.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/durum-doner.png",
    rating: 5,
  },

  // === PIDE ÉS LAHMACUN ===
  {
    id: "p-01",
    name: "Lahmacun",
    price: 1300,
    description: "Vékony tésztán különleges darált húsos töltelék.",
    category: "Pide és Lahmacun", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/lahmacun.jpg",
    rating: 5,
  },
  {
    id: "p-02",
    name: "Diós Lahmacun",
    price: 1600,
    description: "Darált húsos töltelék dióval gazdagítva.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cevizli-lahmacun.jpg",
    rating: 5,
  },
  {
    id: "p-03",
    name: "Kıymalı Pide",
    price: 4200,
    description: "Fűszeres darált hússal készített klasszikus pide.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-pide.jpg",
    rating: 5,
  },
  {
    id: "p-04",
    name: "Kaşarlı Pide",
    price: 3800, 
    description: "Bőséges kaşar sajttal, ropogós szélekkel.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kasarli-peynirli-pide.jpg",
    rating: 5,
  },
  {
    id: "p-05",
    name: "Karışık Pide",
    price: 4500,
    description: "Sucuk, kaşar sajt, darált hús és tojás keveréke.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-pide.jpeg",
    rating: 5,
  },
  {
    id: "p-06",
    name: "Kuşbaşılı Pide",
    price: 4400,
    description: "Kockázott hússal készített pide.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasili-pide.jpg",
    rating: 5,
  },

  // === LEVESEK === 
  {
    id: "c-01",
    name: "Mercimek Çorbası",
    price: 800,
    description: "Hagyományos vörös lencseleves.",
    category: "Levesek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek-corbasi.jpg",
    rating: 5,
  },

  // === KÖRETEK ===
  {
    id: "y-01",
    name: "Hummus Pita",
    price: 1800,
    description: "Házi hummus friss pitával.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/hummus-pitaval.jpg", 
    rating: 5,
  },
  {
    id: "y-02",
    name: "İçli Köfte",
    price: 1200,
    description: "Kívül ropogós, belül gazdagon darált húsos.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/icli-kofte.jpg",
    rating: 5,
  },
  {
    id: "y-03",
    name: "Çiğ Köfte",
    price: 1800,
    description: "Házi készítésű çiğ köfte, zöldekkel.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cig-kofte-porsiyon.jpeg",
    rating: 5,
  },

  // === DESSZERTEK ===
  {
    id: "des-01",
    name: "Künefe", 
    price: 1400,
    description: "Sajtos cérnametélt desszert melegen tálalva.",
    category: "Desszertek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kunefe.jpeg",
    rating: 5,
  },
  {
    id: "des-02",
    name: "Fırın Sütlaç",
    price: 900,
    description: "Klasszikus sütőben sült tejberizs fahéjjal.",
    category: "Desszertek", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/firin-sutlac.jpeg",
    rating: 5,
  },

  // === ITALOK ===
  {
    id: "i-01",
    name: "Ayran",
    price: 450,
    description: "Frissítő házi készítésű ayran.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/acik-ayran.jpg",
    rating: 5,
  },
  {
    id: "i-02",
    name: "Türk Çayı",
    price: 300,
    description: "Hagyományos török tea vékony pohárban.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/turk-cayi.jpg", 
    rating: 5,
  },
  {
    id: "i-03",
    name: "Coca-Cola",
    price: 550,
    description: "Coca-Cola üdítőital (0,33l).",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cola-fanta-sprite.jpeg",
    rating: 5,
  },
  {
    id: "i-04",
    name: "Şalgam",
    price: 480,
    description: "Adana stílusú céklalé csípős vagy enyhe változatban.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/salgam.jpg",
    rating: 5,
  },
  {
    id: "i-05", 
    name: "Su",
    price: 350,
    description: "Szénsavmentes ivóvíz.",
    category: "Italok", 
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/su.jpg",
    rating: 5,
  },
  {
    id: "i-06",
    name: "Meyve Suyu", 
    price: 480,
    description: "Friss gyümölcslevek.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/meyve-suyu.jpeg",
    rating: 5,
  },
  {
    id: "i-07",
    name: "Meyveli Soda",
    price: 450,
    description: "Ízesített ásványvíz különböző ízekben.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/meyvelisoda.jpeg",
    rating: 5,
  }
];

// Menu category groupings for filtering
export const MENU_CATEGORIES: MenuCategory[] = [
  "Gyros Tálak",
  "Gyros Piták", 
  "Hamburgerek",
  "Saláták",
  "Tészták",
  "Közkedvelt Ételek",
  "Kebapok és Grillek",
  "Döner",
  "Dürüm",
  "Pide és Lahmacun",
  "Levesek",
  "Köretek",
  "Desszertek",
  "Italok"
];

// Popular items for homepage
export const POPULAR_ITEMS = MENU_ITEMS.filter(item => 
  ["gt-01", "k-02", "p-05", "dr-01", "d-01"].includes(item.id)
);

// Featured specials
export const FEATURED_SPECIALS = MENU_ITEMS.filter(item =>
  ["gt-03", "k-09", "p-01", "d-01"].includes(item.id)
);