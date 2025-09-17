
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ReservationModal from '../components/ReservationModal';
import WhatsAppOrderModal from '../components/WhatsAppOrderModal';
import OrderChannelDropdown from '../components/OrderChannelDropdown';
import AdminPanel from '../components/AdminPanel';
import { adminConfig } from '../lib/admin';
import { useContent } from '../hooks/useContent';
import { useCart } from '../components/CartProvider';

export default function Home() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { content } = useContent();
  const { addItem, getTotalItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isClient && isMounted) {
      checkAdminAuth();
    }
  }, [isClient, isMounted]);

  const checkAdminAuth = () => {
    if (typeof window === 'undefined') return false;

    const isAuthenticated = localStorage.getItem(adminConfig.sessionKey) === 'true';
    setIsAdminMode(isAuthenticated);
    return isAuthenticated;
  };

  const handleAdminClick = () => {
    if (isAdminMode) {
      setShowAdminPanel(true);
    } else {
      setShowAdminPanel(true);
    }
  };

  const handleAdminLogout = () => {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(adminConfig.sessionKey);
    setIsAdminMode(false);
    setShowAdminPanel(false);
    alert('Admin modundan çıkış yapıldı!');
  };

  const handleTGOYemekOrder = () => {
    if (!content?.orderChannels?.tgoyemek?.active) {
      alert('TGOYemek sipariş kanalı şu anda aktif değil.');
      return;
    }

    const tgoyemekUrl = content.orderChannels?.tgoyemek?.url;
    if (tgoyemekUrl) {
      window.open(tgoyemekUrl, '_blank');
    } else {
      alert('TGOYemek linki bulunamadı. Lütfen admin panelinden kontrol edin.');
    }
  };

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
    });
  };

  const handleCartClick = () => {
    if (isMounted) {
      router.push('/cart');
    }
  };

  const handleMenuClick = () => {
    if (isMounted) {
      router.push('/menu');
    }
  };

  const handleAboutClick = () => {
    if (isMounted) {
      router.push('/about');
    }
  };

  const handleContactClick = () => {
    if (isMounted) {
      router.push('/contact');
    }
  };

  const handleReservationClick = () => {
    if (isMounted) {
      router.push('/reservation');
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Admin Mode Indicator */}
      {isClient && isAdminMode && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50">
          <span className="mr-4">👨‍💼 Admin Modu Aktif - İçerik düzenlemek için tıklayın</span>
          <button
            onClick={() => setShowAdminPanel(true)}
            className="bg-blue-700 px-3 py-1 rounded mr-2 hover:bg-blue-800 cursor-pointer"
          >
            Panel Aç
          </button>
          <button
            onClick={handleAdminLogout}
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 cursor-pointer"
          >
            Çıkış
          </button>
        </div>
      )}

      {/* Header */}
      <header className={`bg-white shadow-md sticky z-50 ${isAdminMode ? 'top-12' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                  BK
                </div>
                <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
                  Borcan Kebap
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <button onClick={handleMenuClick} className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Menü
              </button>
              <button onClick={handleAboutClick} className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Hakkımızda
              </button>
              <button onClick={handleContactClick} className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                İletişim
              </button>
              <button onClick={handleReservationClick} className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                Rezervasyon
              </button>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={() => setShowReservationModal(true)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                Rezervasyon
              </button>
              <OrderChannelDropdown />
              {/* Sepet Butonu */}
              <div className="relative">
                <button onClick={handleCartClick} className="bg-gray-100 text-red-600 p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                  <i className="ri-shopping-cart-line text-2xl"></i>
                </button>
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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Wide%20angle%20view%20of%20traditional%20Turkish%20restaurant%20interior%20with%20elderly%20kebab%20master%20chef%20in%20the%20background%2C%20spacious%20dining%20area%20with%20tables%20and%20chairs%2C%20warm%20ambient%20lighting%2C%20experienced%20old%20chef%20with%20white%20beard%20cooking%20at%20grill%20station%2C%20authentic%20Turkish%20restaurant%20atmosphere%2C%20traditional%20decor%2C%20chef%20visible%20but%20not%20dominating%20the%20frame%2C%20restaurant%20setting%20with%20cooking%20area&width=1920&height=1080&seq=restaurant_wide1&orientation=landscape')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Geleneksel Lezzetler
            <br />
            <span className="text-yellow-400">Modern Sunum</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            <span className="text-3xl md:text-4xl font-bold text-red-600 font-['Pacifico']">
              Borcan Kebap
            </span>
            &apos;ta özgün Türk mutfağının eşsiz lezzetlerini keşfedin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleMenuClick} className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer">
              Menüyü İncele
            </button>
            <button onClick={() => router.push('/reservation')} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
             Rezervasyon
            </button>

          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popüler Lezzetler</h2>
            <p className="text-xl text-gray-600">En çok tercih edilen menü öğelerimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.menuItems?.slice(0, 4).map((item) => (
              <div key={item.id} className="bg-red-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-48 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url('${item.image}')` }}></div>
                <h3 className="text-xl font-semibold text-red-600 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-red-600">₺{item.price}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer flex items-center space-x-1"
                  >
                    <i className="ri-shopping-cart-line text-lg"></i>
                    <span>Sepete Ekle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Channels Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Online Sipariş Ver</h2>
            <p className="text-xl text-gray-600">En hızlı ve kolay sipariş kanallarımız</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TGOYemek Card */}
            {content?.orderChannels?.tgoyemek?.active && (
              <div
                onClick={handleTGOYemekOrder}
                className="bg-purple-100 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-purple-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
                  <i className="ri-restaurant-line text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">
                  {content.orderChannels?.tgoyemek?.text || 'TGOYemek&apos;ten Sipariş Ver'}
                </h3>
                <p className="text-gray-600 text-sm mb-4">Hızlı teslimat ve özel indirimler</p>
                <div className="inline-flex items-center text-purple-600 font-medium">
                  Sipariş Ver
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            )}

            {/* Yemeksepeti Card */}
            {content?.orderChannels?.yemeksepeti?.active && (
              <div
                onClick={() => content.orderChannels?.yemeksepeti?.url && window.open(content.orderChannels.yemeksepeti.url, '_blank')}
                className="bg-orange-100 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-orange-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
                  <i className="ri-shopping-bag-line text-3xl text-orange-600"></i>
                </div>
                <h3 className="text-lg font-bold text-orange-600 mb-2">Yemeksepeti</h3>
                <p className="text-gray-600 text-sm mb-4">Geniş menü seçenekleri</p>
                <div className="inline-flex items-center text-orange-600 font-medium">
                  Sipariş Ver
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            )}

            {/* Getir Card */}
            {content?.orderChannels?.getir?.active && (
              <div
                onClick={() => content.orderChannels?.getir?.url && window.open(content.orderChannels.getir.url, '_blank')}
                className="bg-yellow-100 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-yellow-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
                  <i className="ri-truck-line text-3xl text-yellow-600"></i>
                </div>
                <h3 className="text-lg font-bold text-yellow-600 mb-2">Getir</h3>
                <p className="text-gray-600 text-sm mb-4">Süper hızlı teslimat</p>
                <div className="inline-flex items-center text-yellow-600 font-medium">
                  Sipariş Ver
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            )}

            {/* WhatsApp Card */}
            {content?.orderChannels?.whatsapp?.active && (
              <div
                onClick={() => setShowWhatsAppModal(true)}
                className="bg-green-100 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:bg-green-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
                  <i className="ri-whatsapp-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-lg font-bold text-green-600 mb-2">WhatsApp Sipariş</h3>
                <p className="text-gray-600 text-sm mb-4">Direkt iletişim</p>
                <div className="inline-flex items-center text-green-600 font-medium">
                  Sipariş Ver
                  <i className="ri-arrow-right-line ml-2"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Borcan Kebap Hikayesi</h2>
              <p className="text-lg text-gray-600 mb-6">{content.aboutText}</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{content.aboutStats?.experience}</div>
                  <div className="text-gray-600">Yıllık Deneyim</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{content.aboutStats?.customers}</div>
                  <div className="text-gray-600">Mutlu Müşteri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{content.aboutStats?.menuCount}</div>
                  <div className="text-gray-600">Menü Çeşidi</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">{content.aboutStats?.branches}</div>
                  <div className="text-gray-600">Şube</div>
                </div>
              </div>
              <button onClick={handleAboutClick} className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap">
                Daha Fazlasını Öğren
              </button>
            </div>
            <div className="w-full h-96 bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Traditional%20Turkish%20chef%20preparing%20kebab%20in%20authentic%20restaurant%20kitchen%2C%20skilled%20cook%20grilling%20meat%2C%20professional%20kitchen%20setup%2C%20warm%20lighting%2C%20authentic%20cooking%20process%2C%20Turkish%20cuisine%20preparation%2C%20chef%20in%20action&width=600&height=400&seq=chef1&orientation=landscape')` }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Neden Borcan Kebap?</h2>
            <p className="text-xl text-gray-600">Bizi tercih etmeniz için sebepler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features?.map((feature) => (
              <div key={feature.id} className="text-center p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${feature.icon} text-2xl text-red-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Lezzetin Tadına Varın</h2>
          <p className="text-xl mb-8">Borcan Kebap&apos;ın eşsiz lezzetlerini deneyimleyin</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => router.push('/reservation')} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer">
            Rezervasyon Yap
            </button>

            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              Online Sipariş Ver
              <i className="ri-arrow-right-line ml-2"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                  BK
                </div>
                <span className="font-['Pacifico']">
                  Borcan Kebap
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile buluşturuyoruz.
              </p>
              <div className="flex space-x-4">
                <a href={content.socialMedia?.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a href={content.socialMedia?.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center cursor-pointer hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 transition-all">
                  <i className="ri-instagram-fill text-lg"></i>
                </a>
                {content.socialMedia?.twitter && content.socialMedia.twitter !== '#' && (
                  <a href={content.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <i className="ri-twitter-fill text-sm"></i>
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={handleMenuClick} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Menü
                  </button>
                </li>
                <li>
                  <button onClick={handleAboutClick} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Hakkımızda
                  </button>
                </li>
                <li>
                  <button onClick={handleContactClick} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    İletişim
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowReservationModal(true)} className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Rezervasyon
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Online Sipariş</h4>
              <ul className="space-y-2">
               <li>
                  <a
                    href={content.orderChannels?.yemeksepeti?.url || "https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center"
                  >
                    <i className="ri-restaurant-line mr-2 text-orange-600"></i>
                    Yemeksepeti
                  </a>
                </li>
                <li>
                  <a href={content.orderChannels?.getir?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-truck-line mr-2 text-orange-600"></i>
                    Getir
                  </a>
                </li>
                <li>
                  <a href="https://www.trendyol.com/yemek" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-restaurant-line mr-2 text-purple-600"></i>
                    Trendyol Yemek
                  </a>
                </li>
                <li>
                  <a href={content.orderChannels?.whatsapp?.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
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
                  {content.phone}
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
            <p>&copy; 2024 Borcan Kebap. Tüm hakları saklıdır.</p>
            {isClient && (
              <div className="fixed bottom-6 right-6 z-50">
                <button
                  onClick={handleAdminClick}
                  className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg cursor-pointer"
                  title="Admin Girişi"
                >
                  <i className="ri-admin-line text-lg"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showReservationModal && <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />}

      {showWhatsAppModal && <WhatsAppOrderModal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)} />}

      {/* Admin Panel */}
      {isClient && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}
