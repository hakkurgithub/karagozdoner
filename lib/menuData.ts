// lib/menuData.ts - Karagöz Döner Macaristan Menüsü (Clean)

export type MenuCategory =
  | "Gyros & Döner"
  | "Menük (Menüler)"
  | "Kebap & Grill"
  | "Falafel & Vega"
  | "Levesek (Çorbalar)"
  | "Köretek (Yan Ürünler)"
  | "Desszertek (Tatlılar)"
  | "Italok (İçecekler)";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: MenuCategory;
  image: string;
}

export const MENU_ITEMS: MenuItem[] = [
  // === GYROS & DÖNER ===
  {
    id: "gy-01",
    name: "Gyros Pita",
    price: 1900,
    description: "Klasszikus gyros pitában, friss zöldségekkel és szósszal.",
    category: "Gyros & Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita.jpg",
  },
  {
    id: "gy-02",
    name: "Gyros Tortilla",
    price: 2200,
    description: "Tortilla lapba tekert gyros hús zöldségekkel.",
    category: "Gyros & Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita.jpg",
  },
  {
    id: "gy-03",
    name: "Gyros Tál",
    price: 3800,
    description: "Bőséges gyros hús tálon, körettel és salátával.",
    category: "Gyros & Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpeg",
  },

  // === MENÜK ===
  {
    id: "mn-01",
    name: "Gyros Pita Menü",
    price: 2350,
    description: "Gyros Pita + 0,33l Üdítő.",
    category: "Menük (Menüler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita-menu.jpeg",
  },
  {
    id: "mn-02",
    name: "Gyros Tortilla Menü",
    price: 2650,
    description: "Gyros Tortilla + 0,33l Üdítő.",
    category: "Menük (Menüler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-pita-menu.jpeg",
  },
  {
    id: "mn-03",
    name: "Gyros Tál Menü",
    price: 4250,
    description: "Gyros Tál + 0,33l Üdítő.",
    category: "Menük (Menüler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpeg",
  },

  // === KEBAP & GRILL ===
  {
    id: "kb-01",
    name: "Adana Kebap",
    price: 4200,
    description: "Csípős darált hús nyárson sütve.",
    category: "Kebap & Grill",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-porsiyon.jpg",
  },
  {
    id: "kb-02",
    name: "Köfte Kebap",
    price: 4200,
    description: "Grillezett fűszeres húsgolyók (Köfte).",
    category: "Kebap & Grill",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara-kofte.jpeg",
  },
  {
    id: "kb-03",
    name: "Sis Tavuk (Csirkenyárs)",
    price: 4000,
    description: "Pácolt csirkemell kockák nyárson.",
    category: "Kebap & Grill",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-porsiyon.jpg",
  },

  // === FALAFEL & VEGA ===
  {
    id: "fa-01",
    name: "Falafel Pita",
    price: 1700,
    description: "6db falafel golyó pitában zöldségekkel.",
    category: "Falafel & Vega",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/falafel.jpg",
  },
  {
    id: "fa-02",
    name: "Falafel Tál",
    price: 3200,
    description: "12db falafel golyó tálon, körettel.",
    category: "Falafel & Vega",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/falafel-tal.jpg",
  },
  {
    id: "fa-03",
    name: "Hummus Pitával",
    price: 1500,
    description: "Házi csicseriborsó krém (Humus) pitával vagy tortillával.",
    category: "Falafel & Vega",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/hummus-pitaval.jpg",
  },
  {
    id: "fa-04",
    name: "Rántott Sajt",
    price: 1200,
    description: "2db rántott sajt.",
    category: "Falafel & Vega",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Rántott sajt rizzsel és tartármártással.jpeg",
  },

  // === LEVESEK ===
  {
    id: "lv-01",
    name: "Vörös Lencseleves",
    price: 1200,
    description: "Török vöröslencse leves (Mercimek).",
    category: "Levesek (Çorbalar)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek-corbasi.jpg",
  },
  {
    id: "lv-02",
    name: "Hideg Gyümölcsleves",
    price: 1350,
    description: "Frissítő hideg gyümölcsleves.",
    category: "Levesek (Çorbalar)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyumolcsleves.jpg",
  },

  // === KÖRETEK ===
  {
    id: "ko-01",
    name: "Sültkrumpli",
    price: 1300,
    description: "Friss hasábburgonya.",
    category: "Köretek (Yan Ürünler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/krumpli.jpg",
  },
  {
    id: "ko-02",
    name: "Rizs",
    price: 990,
    description: "Török rizs (Pilav).",
    category: "Köretek (Yan Ürünler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav-ustu-et-doner.jpg",
  },
  {
    id: "ko-03",
    name: "Bulgur",
    price: 990,
    description: "Török bulgur köret.",
    category: "Köretek (Yan Ürünler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/icli-kofte.jpg",
  },

  // === DESSZERTEK ===
  {
    id: "ds-01",
    name: "Török Tejberizs (Sütlaç)",
    price: 1100,
    description: "Kemencében sült tejberizs.",
    category: "Desszertek (Tatlılar)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/firin-sutlac.jpeg",
  },
  {
    id: "ds-02",
    name: "Baklava (Pisztáciás)",
    price: 900,
    description: "Antep fıstıklı baklava.",
    category: "Desszertek (Tatlılar)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/baklava.jpg",
  },

  // === ITALOK ===
  {
    id: "it-01",
    name: "Ayran",
    price: 400,
    description: "Török joghurtital (Poharas).",
    category: "Italok (İçecekler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/acik-ayran.jpg",
  },
  {
    id: "it-02",
    name: "Türk Çayı",
    price: 350,
    description: "Hagyományos török tea.",
    category: "Italok (İçecekler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/turk-cayi.jpg",
  },
  {
    id: "it-03",
    name: "Coca-Cola / Fanta",
    price: 450,
    description: "0,33l Dobozos üdítő.",
    category: "Italok (İçecekler)",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cola-fanta-sprite.jpeg",
  }
];

export const MENU_CATEGORIES: MenuCategory[] = [
  "Gyros & Döner",
  "Menük (Menüler)",
  "Kebap & Grill",
  "Falafel & Vega",
  "Levesek (Çorbalar)",
  "Köretek (Yan Ürünler)",
  "Desszertek (Tatlılar)",
  "Italok (İçecekler)"
];
 
