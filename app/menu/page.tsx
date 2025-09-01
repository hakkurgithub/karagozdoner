
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import OrderChannelDropdown from '../../components/OrderChannelDropdown';
import { useCart } from '../../components/CartProvider';
import { useContent } from '../../hooks/useContent';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category:
    | "Kebaplar & Izgaralar"
    | "Pide & Lahmacun"
    | "Döner"
    | "Dürüm"
    | "Çorbalar"
    | "Yan Ürünler"
    | "Tatlılar"
    | "İçecekler";
  tags?: string[];
  image?: string;
  reviews?: { user: string; comment: string; rating: number }[];
  rating: number;
}

export default function MenuPage() {
  const [filter, setFilter] = useState<MenuItem["category"] | "all">("all");
  const [search, setSearch] = useState("");
  const { addItem, getTotalItems } = useCart();
  const { content } = useContent();

  // Admin panelinden gelen menü öğeleri varsa onları kullan, yoksa varsayılanları
  const menuItems = content.allMenuItems || [];

  const filteredItems = menuItems.filter((item) => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const categories: (MenuItem["category"] | "all")[] = [
    "all",
    "Kebaplar & Izgaralar",
    "Pide & Lahmacun",
    "Döner",
    "Dürüm",
    "Çorbalar",
    "Yan Ürünler",
    "Tatlılar",
    "İçecekler",
  ];

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                  BK
                </div>
                <span className="text-2xl font-bold text-red-600 font-[\\\'Pacifico\\\']">
                  {content.restaurantName}
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/menu" className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                Menü
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                İletişim
              </Link>
              <Link href="/reviews" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Yorumlar
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                Rezervasyon
              </button>
              <OrderChannelDropdown />
              {/* Sepet Butonu */}
              <div className="relative">
                <Link href="/cart">
                  <button className="bg-gray-100 text-red-600 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    <i className="ri-shopping-cart-line text-2xl"></i>
                  </button>
                </Link>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>

              <button className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Menü & Lezzetler</h1>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap ${
                filter === cat ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              {cat === "all" ? "Tümü" : cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col hover:shadow-lg transition-shadow"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={160}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 text-sm mb-2 flex-grow">{item.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-red-600 font-bold text-lg">{item.price} ₺</span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star-${i < (item.rating || 0) ? "fill" : "line"} text-yellow-400 text-sm`}
                    ></i>
                  ))}
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg mt-3 hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Sepete Ekle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                  BK
                </div>
                <span className="font-[\\\'Pacifico\\\']">
                  {content.restaurantName}
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                {content.aboutText}
              </p>
              <div className="flex space-x-4">
                <a
                  href={content.socialMedia?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a
                  href={content.socialMedia?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all"
                >
                  <i className="ri-instagram-fill text-lg"></i>
                </a>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <i className="ri-twitter-fill text-sm"></i>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Menü
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    İletişim
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Rezervasyon
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Online Sipariş</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={content.orderChannels?.yemeksepeti?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-restaurant-line mr-2 text-orange-600"></i>
                    Yemeksepeti
                  </a>
                </li>
                <li>
                  <a
                    href={content.orderChannels?.getir?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-truck-line mr-2 text-orange-600"></i>
                    Getir
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.trendyol.com/yemek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-restaurant-line mr-2 text-purple-600"></i>
                    Trendyol Yemek
                  </a>
                </li>
                <li>
                  <a
                    href={content.orderChannels?.whatsapp?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-whatsapp-line mr-2 text-green-600"></i>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  0212 423 3727
                </li>
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  0545 509 3462
                </li>
                <li className="flex items-center">
                  <i className="ri-whatsapp-line mr-2"></i>
                  0545 509 3462 (WhatsApp)
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  info@borcankebap.com
                </li>
                <li className="flex items-start">
                  <i className="ri-map-pin-line mr-2 mt-1"></i>
                  <a
                    href="https://maps.app.goo.gl/rQdBMCqk5GMwdVSM7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {content.address}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {content.restaurantName}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
