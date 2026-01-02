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

// Karagöz Döner Kebap - Görseldeki Güncel Menü Verileri (2026)
export const MENU_ITEMS: MenuItem[] = [
  // === GYROS ===
  {
    id: "gy-01",
    name: "Gyros Pita",
    price: 1900,
    description: "Taze pitada servis edilen gyros.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita.jpg",
  },
  {
    id: "gy-02",
    name: "Gyros Tortilla",
    price: 2200,
    description: "Lavaş (tortilla) içine sarılmış gyros.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita.jpg",
  },
  {
    id: "gy-03",
    name: "Gyros Tál",
    price: 3800,
    description: "Tabakta servis edilen zengin gyros porsiyonu.",
    category: "Gyros Tálak",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpeg",
  },

  // === MENÜLER (İçecekli) ===
  {
    id: "m-01",
    name: "Gyros Pita Menü",
    price: 2350,
    description: "Gyros Pita + 0,33l üdítő.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita-menu.jpeg",
  },
  {
    id: "m-02",
    name: "Gyros Tortilla Menü",
    price: 2650,
    description: "Gyros Tortilla + 0,33l üdítő.",
    category: "Gyros Piták",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita-menu.jpeg",
  },
  {
    id: "m-03",
    name: "Gyros Tál Menü",
    price: 4250,
    description: "Gyros Tál + 0,33l üdítő.",
    category: "Gyros Tálak",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpeg",
  },

  // === FALAFEL ===
  {
    id: "fa-01",
    name: "Falafel Pita (6db)",
    price: 1700,
    description: "6 adet falafel topu içeren pita ekmeği.",
    category: "Közkedvelt Ételek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/falafel.jpg",
  },
  {
    id: "fa-02",
    name: "Falafel Tál (12db)",
    price: 3200,
    description: "12 adet falafel topu içeren zengin tabak.",
    category: "Közkedvelt Ételek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/falafel-tal.jpg",
  },

  // === KEBAPOK ===
  {
    id: "kb-01",
    name: "Adana Kebap",
    price: 4200,
    description: "Geleneksel acılı zırh kıyması kebap.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-porsiyon.jpg",
  },
  {
    id: "kb-02",
    name: "Köfte Kebap",
    price: 4200,
    description: "Izgara köfte porsiyon.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara-kofte.jpeg",
  },
  {
    id: "kb-03",
    name: "Sis Tavuk (Csirkenyárs)",
    price: 4000,
    description: "Özel soslu tavuk şiş porsiyon.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-porsiyon.jpg",
  },

  // === LEVESEK (Çorbalar) ===
  {
    id: "lv-01",
    name: "Vörös Lencseleves",
    price: 1200,
    description: "Geleneksel süzme mercimek çorbası.",
    category: "Levesek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek-corbasi.jpg",
  },
  {
    id: "lv-02",
    name: "Hideg Gyümölcsleves",
    price: 1350,
    description: "Soğuk meyve çorbası.",
    category: "Levesek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyumolcsleves.jpg",
  },

  // === KÖRETEK VE DESSZERTEK ===
  {
    id: "ko-01",
    name: "Sültkrumpli",
    price: 1300,
    description: "Çıtır patates kızartması.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/krumpli.jpg",
  },
  {
    id: "ds-01",
    name: "Baklava (Pisztáciás)",
    price: 900,
    description: "Antep fıstıklı geleneksel baklava.",
    category: "Desszertek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/baklava.jpg",
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
