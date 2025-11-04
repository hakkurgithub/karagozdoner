import { useState, useEffect } from "react";
import { MENU_ITEMS, type MenuItem } from "../lib/menuData";

type OrderChannel = {
  active: boolean;
  url: string;
  text?: string;
};

type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type AboutStats = {
  experience: string;
  customers: string;
  menuCount: string;
  branches: string;
};

export interface ContentData {
  restaurantName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  phone: string;
  address: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string; // (Kaldırıldı ama tipte durabilir)
    twitter?: string; // (Kaldırıldı ama tipte durabilir)
  };
  orderChannels?: Record<string, OrderChannel>;
  menuItems?: MenuItem[];
  allMenuItems?: MenuItem[];
  aboutStats?: AboutStats;
  features?: FeatureCard[];
}

// Varsayılan menü öğeleri (lib/menuData.ts dosyasından gelir - Zaten Macarca)
const defaultAllMenuItems: MenuItem[] = MENU_ITEMS.map((item) => ({ ...item }));

// Vurgulanan menü ID'leri (lib/menuData.ts dosyasındaki Macarca ID'lere göre güncellendi)
const highlightedMenuIds = ["wix-g-01", "wix-h-02", "wix-gp-01", "k-12"] as const;

const defaultMenuItems: MenuItem[] = highlightedMenuIds
  .map((id) => defaultAllMenuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));

// === DİL, İSİM, İLETİŞİM, SOSYAL MEDYA VE SİPARİŞ KANALLARI GÜNCELLENDİ ===
const defaultContent: ContentData = {
  restaurantName: "Karagöz Döner",
  heroTitle: "Hagyományos Török Ízek",
  heroSubtitle:
    "Kóstolja meg a legfrissebb alapanyagokból készült ízletes kebabjainkat",
  aboutText:
    "Családunk 40 éves tapasztalatával a legfinomabb kebabokat kínáljuk Önnek Esztergomban.",
  phone: "06 20 934 1537",
  address: "2500, Esztergom\nKossuth Lajos utca 30.",
  orderChannels: {
    whatsapp: {
      active: true,
      url: "https://wa.me/36209341537?text=Helló!%20Rendelni%20szeretnék.",
    },
    // === YENİ KANALLAR EKLENDİ (Wix) ===
    foodora: {
      active: true,
      url: "#" // Foodora linkinizi buraya ekleyin
    },
    wolt: {
      active: true,
      url: "#" // Wolt linkinizi buraya ekleyin
    }
  },
  socialMedia: {
    // === SOSYAL MEDYA GÜNCELLENDİ (Wix) ===
    facebook: "https://www.facebook.com/profile.php?id=61560428630473"
    // Instagram ve Twitter kaldırıldı
  },
  menuItems: defaultMenuItems,
  allMenuItems: defaultAllMenuItems,
  aboutStats: {
    experience: "10+", // (Güncellendi)
    customers: "10K+", // (Güncellendi)
    menuCount: "50+", // (Güncellendi)
    branches: "1", // (Güncellendi)
  },
  // === DİL GÜNCELLEMESİ (Özellikler) ===
  features: [
    {
      id: "1",
      title: "Friss Alapanyagok",
      description: "Minden nap frissen válogatott, minőségi alapanyagokból készült ételek",
      icon: "ri-restaurant-line",
    },
    {
      id: "2",
      title: "Grill Íz",
      description: "Hagyományos faszénparázson sült egyedi kebab ízek",
      icon: "ri-fire-line",
    },
    {
      id: "3",
      title: "Gyors Kiszolgálás",
      description: "Online rendeléseit rövid időn belül, forrón szállítjuk címére",
      icon: "ri-truck-line",
    },
  ],
};

export function useContent() {
  const [content, setContent] = useState<ContentData>(defaultContent);

  const updateContent = (newData: Partial<ContentData>) => {
    setContent((prev) => ({ ...prev, ...newData }));
  };

  const resetContent = () => {
    setContent(defaultContent);
  };

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/content.json");
        if (!res.ok) {
          throw new Error(`Content request failed with status ${res.status}`);
        }
        const data = await res.json();
        setContent({
          ...defaultContent,
          ...data,
          menuItems: data.menuItems ?? defaultMenuItems,
          allMenuItems: data.allMenuItems ?? defaultAllMenuItems,
        });
      } catch (error) {
        // === DİL GÜNCELLEMESİ ===
        console.error("Hiba történt a tartalom betöltése közben:", error);
      }
    }

    fetchContent();
  }, []);

  return { content, updateContent, resetContent };
}