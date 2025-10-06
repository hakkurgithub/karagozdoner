'use client';

import { useState, useEffect } from 'react';

interface ContentData {
  restaurantName: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  phone: string;
  address: string;
  orderChannels?: {
    tgoyemek?: {
      active: boolean;
      url: string;
      text: string;
    };
    yemeksepeti?: {
      active: boolean;
      url: string;
    };
    getir?: {
      active: boolean;
      url: string;
    };
    whatsapp?: {
      active: boolean;
      url: string;
    };
  };
  menuItems?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image?: string;
    rating?: number;
  }>;
  aboutStats?: {
    experience: string;
    customers: string;
    menuCount: string;
    branches: string;
  };
  features?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  socialMedia?: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  allMenuItems?: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
    category: "Kebaplar & Izgaralar" | "Pide & Lahmacun" | "Döner" | "Dürüm" | "Çorbalar" | "Yan Ürünler" | "Tatlılar" | "İçecekler";
    rating: number;
    image?: string;
  }>;
}

const defaultAllMenuItems = [
  // Kebaplar & Izgaralar (12 adet)
  {
    id: "k-01",
    name: "Adana Kebap",
    description: "Özel baharatlarla hazırlanmış acılı kıyma kebabı, pilav ve közlenmiş sebze ile servis edilir",
    price: 450,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Adanaporsiyon.jpg",
  },
  {
    id: "k-02",
    name: "Urfa Kebap",
    description: "Urfa usulü hazırlanmış aromalı kebap, bulgur pilavı ve taze yeşillikler ile",
    price: 450,
    category: "Kebaplar & Izgaralar" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Adanaporsiyon.jpg",
  },
  {
    id: "k-03",
    name: "Beyti",
    description: "Lavaş ekmeği içinde beyti kebap, yoğurt ve tereyağı sosu ile",
    price: 600,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Beyti%20Sarma.jpg",
  },
  {
  id: "k-04",
  name: "İskender Kebap",
  description: "Yoğurt ve tereyağı soslu özel kebap",
  price: 500,
  category: "Kebaplar & Izgaralar" as const,
  rating: 5,
  image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender%20Kebap.jpeg"
},
  {
    id: "k-05",
    name: "Et Şiş",
    description: "Marine edilmiş kuzu eti şiş",
    price: 650,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Turkish%20shish%20kebab%20grilled%20meat%20cubes%20on%20skewers%20with%20rice%20and%20vegetables%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=sis1&orientation=landscape",
  },
  {
    id: "k-06",
    name: "Tavuk Şiş",
    description: "Marine edilmiş tavuk göğsü şiş",
    price: 400,
    category: "Kebaplar & Izgaralar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20chicken%20shish%20kebab%20grilled%20marinated%20chicken%20pieces%20on%20skewers%20with%20rice%20pilaf%20and%20salad%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=tavuksis1&orientation=landscape",
  },
  {
    id: "k-07",
    name: "Kuzu Pirzola",
    description: "Taze kuzu pirzolaları ızgara",
    price: 750,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20lamb%20chops%20with%20herbs%20and%20vegetables%20on%20white%20plate%20elegant%20presentation%20professional%20food%20photography&width=400&height=300&seq=pirzola1&orientation=landscape",
  },
  {
    id: "k-08",
    name: "Köfte",
    description: "El yapımı köfte ızgara",
    price: 350,
    category: "Kebaplar & Izgaralar" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara%20k%C3%B6fte.jpeg",
  },
  {
    id: "k-09",
    name: "Karışık Izgara",
    description: "Adana, urfa, şiş ve köfte karışımı",
    price: 800,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-izgara.jpg",
  },
  {
    id: "k-10",
    name: "Tavuk Kanadı",
    description: "Marine edilmiş tavuk kanat ızgara",
    price: 300,
    category: "Kebaplar & Izgaralar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20chicken%20wings%20marinated%20with%20spices%20on%20white%20plate%20with%20garnish%20professional%20food%20photography&width=400&height=300&seq=kanat1&orientation=landscape",
  },
  {
    id: "k-11",
    name: "Çöp Şiş",
    description: "İnce çubukta özel baharatlı et",
    price: 550,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis.jpg",
  },
  {
    id: "k-12",
    name: "Antrikot",
    description: "Izgara dana antrikot",
    price: 900,
    category: "Kebaplar & Izgaralar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20beef%20steak%20antrikot%20with%20vegetables%20and%20sauce%20on%20white%20plate%20premium%20presentation%20professional%20food%20photography&width=400&height=300&seq=antrikot1&orientation=landscape",
  },

  // Pide & Lahmacun (8 adet)
  {
    id: "p-01",
    name: "Lahmacun",
    description: "İnce hamur üzerinde baharatlı kıyma",
    price: 130,
    category: "Pide & Lahmacun" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Lahmacun.jpg",
  },
  {
    id: "p-02",
    name: "Kuşbaşılı Pide",
    description: "Kuşbaşı et ile pide",
    price: 450,
    category: "Pide & Lahmacun" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Kusbasili-Pide.jpeg",
  },
  {
    id: "p-03",
    name: "Kaşarlı Pide",
    description: "Kaşar peynirli pide",
    price: 400,
    category: "Pide & Lahmacun" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Kasarlı Pide.jpg",
  },
  {
    id: "p-04",
    name: "Karışık Pide",
    description: "Kıyma, kaşar ve sucuk karışımı",
    price: 400,
    category: "Pide & Lahmacun" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisikpide.jpeg",
  },
  {
    id: "p-05",
    name: "Sucuklu Pide",
    description: "Sucuk ve kaşar peynirli pide",
    price: 380,
    category: "Pide & Lahmacun" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sucuklu-kasarli-pide.jpg",
  },
  {
    id: "p-06",
    name: "Yumurtalı Pide",
    description: "Yumurta ve kaşar peynirli pide",
    price: 350,
    category: "Pide & Lahmacun" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20pide%20bread%20with%20egg%20and%20cheese%20boat%20shaped%20golden%20brown%20crust%20breakfast%20style%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=yumurtali1&orientation=landscape",
  },
  {
    id: "p-07",
    name: "Kıymalı Pide",
    description: "Baharatlı kıyma ile hazırlanmış pide",
    price: 420,
    category: "Pide & Lahmacun" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Kıymalı Pide.jpg", 
  },
  {
    id: "p-08",
    name: "Açık Ayran",
    description: "Yoğurt, salatalık ve naneli ayran",
    price: 25,
    category: "Pide & Lahmacun" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/acık ayran.jpg",
  },

  // Döner (6 adet)
  {
    id: "d-01",
    name: "Porsiyon Et Döner",
    description: "Premium et döner, pilav ve garnitür ile",
    price: 500,
    category: "Döner" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Porsiyon et döner.jpg",
  },
  {
    id: "d-02",
    name: "Pilav Üstü Döner",
    description: "Pilav üzerinde döner eti",
    price: 450,
    category: "Döner" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav ustu et doner.jpg",
  },
  {
    id: "d-03",
    name: "Dürüm Döner",
    description: "Lavaş içinde döner dürüm",
    price: 300,
    category: "Döner" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Durum doner.png",
  },
  {
    id: "d-04",
    name: "Tavuk Döner",
    description: "Tavuk döner porsiyon",
    price: 400,
    category: "Döner" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Tavuk Doner.jpg",
  },
  {
    id: "d-05",
    name: "Ekmek Arası Döner",
    description: "Ekmek içinde döner",
    price: 250,
    category: "Döner" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/ekmek arasi doner.jpg",
  },
  {
    id: "d-06",
    name: "Çifte Döner",
    description: "Et ve tavuk döner karışımı",
    price: 550,
    category: "Döner" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/cifte doner.png",
  },

  // Dürüm (6 adet)
  {
    id: "dr-01",
    name: "Adana Dürüm",
    description: "Lavaş içinde Adana kebap",
    price: 250,
    category: "Dürüm" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana durum.jpg",
  },
  {
    id: "dr-02",
    name: "Urfa Dürüm",
    description: "Lavaş içinde Urfa kebap",
    price: 250,
    category: "Dürüm" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana durum.jpg",
  },
  {
    id: "dr-03",
    name: "Tavuk Şiş Dürüm",
    description: "Tavuk şişten yapılan dürüm",
    price: 250,
    category: "Dürüm" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Tavuk sis durum.png",
  },
  {
    id: "dr-04",
    name: "Köfte Dürüm",
    description: "Köfte ile hazırlanmış dürüm",
    price: 220,
    category: "Dürüm" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kofte-durum.jpg",
  },
  {
    id: "dr-05",
    name: "Et Şiş Dürüm",
    description: "Et şiş ile hazırlanmış dürüm",
    price: 350,
    category: "Dürüm" as const,
    rating: 5,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Et sis Durum.png",
  },
  {
    id: "dr-06",
    name: "Kanat Dürüm",
    description: "Tavuk kanat ile hazırlanmış dürüm",
    price: 200,
    category: "Dürüm" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/Tavuk Kanat Durum.png",
  },

  // Çorbalar (4 adet)
  {
    id: "c-01",
    name: "Mercimek Çorbası",
    description: "Geleneksel kırmızı mercimek çorbası",
    price: 40,
    category: "Çorbalar" as const,
    rating: 4,
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek corbasi.jpg",
  },
  {
    id: "c-02",
    name: "Ezogelin Çorbası",
    description: "Bulgur ve mercimekli özel çorba",
    price: 45,
    category: "Çorbalar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20Ezogelin%20soup%20with%20bulgur%20and%20lentils%20in%20white%20bowl%20garnished%20with%20herbs%20on%20white%20background&width=400&height=300&seq=ezogelin1&orientation=landscape",
  },
  {
    id: "c-03",
    name: "Yayla Çorbası",
    description: "Yoğurt ve nohutlu çorba",
    price: 50,
    category: "Çorbalar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20yayla%20soup%20with%20yogurt%20and%20chickpeas%20in%20white%20bowl%20with%20mint%20garnish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=yayla1&orientation=landscape",
  },
  {
    id: "c-04",
    name: "Tavuk Suyu Çorbası",
    description: "Geleneksel tavuk suyu çorbası",
    price: 35,
    category: "Çorbalar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20chicken%20soup%20clear%20broth%20with%20vegetables%20in%20white%20bowl%20homemade%20style%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=tavuksuyu1&orientation=landscape",
  },

  // Yan Ürünler (6 adet)
  {
    id: "y-01",
    name: "Bulgur Pilavı",
    description: "Tereyağlı bulgur pilavı",
    price: 35,
    category: "Yan Ürünler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20bulgur%20pilaf%20with%20butter%20in%20white%20bowl%20garnished%20with%20herbs%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=bulgur1&orientation=landscape",
  },
  {
    id: "y-02",
    name: "Mevsim Salata",
    description: "Taze sebzelerden hazırlanmış salata",
    price: 50,
    category: "Yan Ürünler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Fresh%20Turkish%20seasonal%20salad%20with%20mixed%20vegetables%20tomatoes%20cucumbers%20onions%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=salata1&orientation=landscape",
  },
  {
    id: "y-03",
    name: "Közlenmiş Sebze",
    description: "Karışık közlenmiş sebzeler",
    price: 60,
    category: "Yan Ürünler" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Turkish%20grilled%20roasted%20vegetables%20mixed%20peppers%20tomatoes%20eggplant%20on%20white%20plate%20healthy%20side%20dish%20professional%20food%20photography&width=400&height=300&seq=sebze1&orientation=landscape",
  },
  {
    id: "y-04",
    name: "Cacık",
    description: "Yoğurt, salatalık ve nane",
    price: 30,
    category: "Yan Ürünler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20cacik%20yogurt%20cucumber%20mint%20dip%20in%20white%20bowl%20traditional%20side%20dish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=cacik1&orientation=landscape",
  },
  {
    id: "y-05",
    name: "Pilav",
    description: "Tereyağlı pirinç pilavı",
    price: 30,
    category: "Yan Ürünler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20rice%20pilaf%20with%20butter%20in%20white%20bowl%20fluffy%20texture%20traditional%20side%20dish%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=pilav1&orientation=landscape",
  },
  {
    id: "y-06",
    name: "Turşu",
    description: "Ev yapımı karışık turşu",
    price: 25,
    category: "Yan Ürünler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20homemade%20mixed%20pickles%20vegetables%20in%20white%20bowl%20traditional%20fermented%20vegetables%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=tursu1&orientation=landscape",
  },

  // Tatlılar (4 adet)
  {
    id: "t-01",
    name: "Baklava",
    description: "Antep fıstıklı geleneksel baklava",
    price: 80,
    category: "Tatlılar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20baklava%20pastry%20with%20pistachios%20and%20honey%20syrup%20golden%20layers%20on%20white%20plate%20professional%20food%20photography&width=400&height=300&seq=baklava1&orientation=landscape",
  },
  {
    id: "t-02",
    name: "Künefe",
    description: "Peynirli tel kadayıf tatlısı",
    price: 90,
    category: "Tatlılar" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20kunefe%20dessert%20with%20cheese%20and%20shredded%20phyllo%20pastry%20golden%20brown%20on%20white%20plate%20with%20syrup&width=400&height=300&seq=kunefe1&orientation=landscape",
  },
  {
    id: "t-03",
    name: "Sütlaç",
    description: "Fırında sütlaç",
    price: 60,
    category: "Tatlılar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20rice%20pudding%20sutlac%20in%20white%20bowl%20with%20cinnamon%20traditional%20dessert%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=sutlac1&orientation=landscape",
  },
  {
    id: "t-04",
    name: "Muhallebi",
    description: "Tarçınlı muhallebi",
    price: 50,
    category: "Tatlılar" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20muhallebi%20milk%20pudding%20with%20cinnamon%20in%20white%20bowl%20traditional%20dessert%20on%20white%20background%20professional%20food%20photography&width=400&height=300&seq=muhallebi1&orientation=landscape",
  },

  // İçecekler (6 adet)
  {
    id: "i-01",
    name: "Ayran",
    description: "Ev yapımı taze ayran",
    price: 20,
    category: "İçecekler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Fresh%20Turkish%20ayran%20yogurt%20drink%20in%20tall%20glass%20with%20foam%20on%20top%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=ayran1&orientation=landscape",
  },
  {
    id: "i-02",
    name: "Çay",
    description: "Geleneksel Türk çayı",
    price: 15,
    category: "İçecekler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20tea%20in%20tulip%20glass%20with%20saucer%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=cay1&orientation=landscape",
  },
  {
    id: "i-03",
    name: "Türk Kahvesi",
    description: "Geleneksel Türk kahvesi",
    price: 30,
    category: "İçecekler" as const,
    rating: 5,
    image: "https://readdy.ai/api/search-image?query=Traditional%20Turkish%20coffee%20in%20small%20cup%20with%20foam%20and%20Turkish%20delight%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=kahve1&orientation=landscape",
  },
  {
    id: "i-04",
    name: "Şalgam",
    description: "Acı şalgam suyu",
    price: 25,
    category: "İçecekler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Turkish%20shalgam%20turnip%20juice%20in%20tall%20glass%20traditional%20fermented%20drink%20purple%20color%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=salgam1&orientation=landscape",
  },
  {
    id: "i-05",
    name: "Kola",
    description: "Soğuk kola",
    price: 20,
    category: "İçecekler" as const,
    rating: 3,
    image: "https://readdy.ai/api/search-image?query=Cold%20cola%20drink%20in%20glass%20with%20ice%20cubes%20refreshing%20beverage%20on%20white%20background%20professional%20beverage%20photography&width=400&height=300&seq=kola1&orientation=landscape",
  },
  {
    id: "i-06",
    name: "Su",
    description: "İçme suyu (şişe)",
    price: 10,
    category: "İçecekler" as const,
    rating: 4,
    image: "https://readdy.ai/api/search-image?query=Bottled%20drinking%20water%20clear%20plastic%20bottle%20on%20white%20background%20simple%20clean%20professional%20photography&width=400&height=300&seq=su1&orientation=landscape",
  },
];

const defaultContent: ContentData = {
  restaurantName: 'Borcan Kebap',
  heroTitle: 'Geleneksel Türk Lezzetleri',
  heroSubtitle: 'En taze malzemeler ile hazırlanan nefis kebaplarımızı denemeye davetlisiniz',
  aboutText: 'Ailemizin 40 yıllık deneyimi ile size en lezzetli kebapları sunuyoruz.',
  phone: '+90 212 423 3727',
  address: 'Beyoğlu Caddesi No: 35/A, Parseller, Avcılar/İstanbul',
  orderChannels: {
    tgoyemek: {
      active: false,
      url: '',
      text: 'TGOYemek\'ten Sipariş Ver'
    },
    yemeksepeti: {
      active: true,
      url: 'https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu'
    },
    getir: {
      active: true,
      url: 'https://getir.com/yemek/restoran/borcan-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/'
    },
    whatsapp: {
      active: true,
      url: 'https://wa.me/905455093462?text=Merhaba! Borcan Kebap\'tan sipariş vermek istiyorum.'
    }
  },
  menuItems: [
    {
      id: '1',
      name: 'Adana Kebap',
      price: 450,
      description: 'Özel baharatlarla hazırlanmış geleneksel Adana kebap',
      category: 'Kebaplar',
      image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/yemek%20resimleri/Adanaporsiyon.jpg'
    },
    {
      id: '2',
      name: 'Karışık Pide',
      price: 400,
      description: 'Kaşar, sucuk ve yumurtalı özel pide',
      category: 'Pideler',
      image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/karisikpide.jpeg'
    },
    {
      id: '3',
      name: 'Lahmacun',
      price: 130,
      description: 'İnce hamur üzerine özel kıymalı lahmacun',
      category: 'Lahmacunlar',
      image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/Lahmacun.jpg'
    },
    {
      id: '4',
      name: 'Döner Kebap',
      price: 500,
      description: 'Taze döner eti, pilav ve salata ile servis',
      category: 'Kebaplar',
      image: 'https://raw.githubusercontent.com/hakkurgithub/images/main/yemek resimleri/Porsiyon et döner.jpg'
    }
  ],
  allMenuItems: defaultAllMenuItems,
  aboutStats: {
    experience: '40+',
    customers: '50K+',
    menuCount: '100+',
    branches: '5'
  },
  features: [
    {
      id: '1',
      title: 'Taze Malzemeler',
      description: 'Her gün taze seçilen kaliteli malzemelerle hazırlanan lezzetli yemekler',
      icon: 'ri-restaurant-line'
    },
    {
      id: '2',
      title: 'Mangal Lezzeti',
      description: 'Geleneksel mangal ateşinde pişirilen eşsiz kebap lezzetleri',
      icon: 'ri-fire-line'
    },
    {
      id: '3',
      title: 'Hızlı Teslimat',
      description: 'Online siparişlerinizi kısa sürede sıcak olarak adresinize ulaştırıyoruz',
      icon: 'ri-truck-line'
    }
  ],
  socialMedia: {
    facebook: 'https://www.facebook.com/brcnkbp',
    instagram: 'https://www.instagram.com/borcan_kebap_pide_lahmacun/',
    twitter: '#'
  }
};

export function useContent() {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedContent = localStorage.getItem('borcan_admin_content');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          const mergedContent = { 
            ...defaultContent, 
            ...parsedContent,
            allMenuItems: parsedContent.allMenuItems || defaultAllMenuItems
          };
          setContent(mergedContent);
        } catch (error) {
          console.error('İçerik yüklenirken hata:', error);
        }
      }
    }
  }, []);

  const updateContent = (newContent: Partial<ContentData>) => {
    const updatedContent = { ...content, ...newContent };
    setContent(updatedContent);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('borcan_admin_content', JSON.stringify(updatedContent));
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('borcan_admin_content');
    }
  };

  return { content, updateContent, resetContent };
}
