'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
import ReservationModal from '../components/ReservationModal';
import AdminPanel from '../components/AdminPanel';
import { adminConfig } from '../lib/admin';

export default function Home() {
  const { content } = useContent();
  const { addItem } = useCart();
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddToCart = (item: any) => {
    // === FİYAT MANTIĞI GÜNCELLEMESİ (Ft için) ===
    const price = Math.round(parseFloat(String(item.price)));
    addItem({ id: item.id, name: item.name, price: price });
  };

  // === DİL GÜNCELLEMESİ (Admin uyarıları) ===
  const handleAdminClick = () => {
    const password = prompt("Kérjük, adja meg a jelszót a kezelőpanel eléréséhez:");
    if (password === adminConfig.password) {
      setShowAdminPanel(true);
    } else {
      alert("Hibás jelszó. Kérjük, próbálja újra.");
    }
  };

  if (!isClient) {
    return null;
  }

  const popularItems = (content.allMenuItems || []).slice(0, 4);

  // === DİL, İSİM VE İÇERİK GÜNCELLEMESİ (Varsayılan metin) ===
  const aboutText = content.aboutText || "Üdvözöljük a Karagöz Döner-nél! Autentikus török ízeket kínálunk Esztergom szívében. Több évtizedes tapasztalattal és a minőség iránti elkötelezettséggel minden ételünkben érezheti a minőséget és a frissességet.";

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] flex items-center justify-center text-white text-center overflow-hidden"
        style={{
          // === İSİM GÜNCELLEMESİ (Resim yolu) ===
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/Karagoz-doner-exterior.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 font-['Pacifico'] leading-tight">
            {content.restaurantName}
          </h1>
          <p className="text-lg sm:text-xl font-light mb-6">
            {content.heroTitle}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              {/* === DİL GÜNCELLEMESİ === */}
              Menü Megtekintése
            </Link>
            <button
              onClick={() => setShowReservationModal(true)}
              className="bg-white text-red-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg"
            >
              {/* === DİL GÜNCELLEMESİ === */}
              Asztalfoglalás
            </button>
          </div>
        </div>
      </section>

      {/* Popüler Ürünler */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {/* === DİL GÜNCELLEMESİ === */}
            Népszerű Ízeink
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm flex-1">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-bold text-red-600">
                      {/* === FİYAT VE PARA BİRİMİ GÜNCELLEMESİ === */}
                      {Math.round(parseFloat(String(item.price)))} Ft
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      {/* === DİL GÜNCELLEMESİ === */}
                      <i className="ri-shopping-cart-fill mr-2"></i>Hozzáad
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hakkımızda Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative h-[350px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about.jpg" // Bu resim 404 veriyordu, /public/images/ altına eklediğinizden emin olun
              alt="Rólunk"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">
              {/* === DİL GÜNCELLEMESİ === */}
              Rólunk
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {aboutText}
            </p>
          </div>
        </div>
      </section>

      {/* İletişim Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            {/* === DİL GÜNCELLEMESİ === */}
            Elérhetőség
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-map-pin-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {/* === DİL GÜNCELLEMESİ === */}
                Cím
              </h3>
              <p className="text-gray-700">
                {content.address} {/* <-- Bu, Yönetim Panelinden gelir */}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-phone-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {/* === DİL GÜNCELLEMESİ === */}
                Telefonszám
              </h3>
              <p className="text-gray-700">
                {content.phone} {/* <-- Bu, Yönetim Panelinden gelir */}
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <i className="ri-mail-line text-4xl text-red-600 mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">E-mail</h3>
              {/* === E-POSTA GÜNCELLEMESİ === */}
              <p className="text-gray-700">info@karagozdoner.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin ve Modallar */}
      {isClient && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <a
            href="/manager/products"
            className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
            // === DİL GÜNCELLEMESİ ===
            title="Termékkezelés"
          >
            <i className="ri-shopping-bag-line text-lg"></i>
          </a>
          <button
            onClick={handleAdminClick}
            className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
            // === DİL GÜNCELLEMESİ ===
            title="Kezelőpanel"
          >
            <i className="ri-admin-line text-lg"></i>
          </button>
        </div>
      )}

      <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />
      <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />
      {isClient && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}