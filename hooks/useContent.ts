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
    instagram?: string;
    twitter?: string;
  };
  orderChannels?: Record<string, OrderChannel>;
  menuItems?: MenuItem[];
  allMenuItems?: MenuItem[];
  aboutStats?: AboutStats;
  features?: FeatureCard[];
}

const defaultAllMenuItems: MenuItem[] = MENU_ITEMS.map((item) => ({ ...item }));

const highlightedMenuIds = ["k-01", "p-04", "p-01", "d-01"] as const;

const defaultMenuItems: MenuItem[] = highlightedMenuIds
  .map((id) => defaultAllMenuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem => Boolean(item));

const defaultContent: ContentData = {
  restaurantName: "Borcan Kebap",
  heroTitle: "Geleneksel Türk Lezzetleri",
  heroSubtitle:
    "En taze malzemeler ile hazırlanan nefis kebaplarımızı denemeye davetlisiniz",
  aboutText:
    "Ailemizin 40 yıllık deneyimi ile size en lezzetli kebapları sunuyoruz.",
  phone: "+90 212 423 3727",
  address: "Beyoğlu Caddesi No: 35/A, Parseller, Avcılar/İstanbul",
  orderChannels: {
    tgoyemek: {
      active: false,
      url: "",
      text: "TGOYemek'ten Sipariş Ver",
    },
    yemeksepeti: {
      active: true,
      url: "https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu",
    },
    getir: {
      active: true,
      url: "https://getir.com/yemek/restoran/borcan-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/",
    },
    whatsapp: {
      active: true,
      url: "https://wa.me/905455093462?text=Merhaba! Borcan Kebap'tan sipariş vermek istiyorum.",
    },
  },
  socialMedia: {
    facebook: "https://www.facebook.com/brcnkbp",
    instagram: "https://www.instagram.com/borcan_kebap_pide_lahmacun/",
    twitter: "#",
  },
  menuItems: defaultMenuItems,
  allMenuItems: defaultAllMenuItems,
  aboutStats: {
    experience: "40+",
    customers: "50K+",
    menuCount: "100+",
    branches: "5",
  },
  features: [
    {
      id: "1",
      title: "Taze Malzemeler",
      description: "Her gün taze seçilen kaliteli malzemelerle hazırlanan lezzetli yemekler",
      icon: "ri-restaurant-line",
    },
    {
      id: "2",
      title: "Mangal Lezzeti",
      description: "Geleneksel mangal ateşinde pişirilen eşsiz kebap lezzetleri",
      icon: "ri-fire-line",
    },
    {
      id: "3",
      title: "Hızlı Teslimat",
      description: "Online siparişlerinizi kısa sürede sıcak olarak adresinize ulaştırıyoruz",
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
        console.error("İçerik yüklenirken hata oluştu:", error);
      }
    }

    fetchContent();
  }, []);

  return { content, updateContent, resetContent };
}