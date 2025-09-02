'use client';

import Link from 'next/link';
import { useState } from 'react';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<
    { type: 'success' | 'error'; text: string } | null
  >(null);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated form submission
    setTimeout(() => {
      setSubmitMessage({
        type: 'success',
        text: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
      });
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOrderClick = () => {
    setShowOrderDropdown(!showOrderDropdown);
  };

  const handleChannelClick = (channel: any) => {
    if (channel.url) {
      window.open(channel.url, '_blank');
    }
    setShowOrderDropdown(false);
  };

  const orderChannels = [
    { 
      id: 'yemeksepeti', 
      name: 'Yemek Sepeti', 
      icon: 'ri-restaurant-line', 
      color: 'text-orange-600',
      url: 'https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu'
    },
    { 
      id: 'getir', 
      name: 'Getir', 
      icon: 'ri-truck-line', 
      color: 'text-yellow-600',
      url: 'https://getir.com/yemek/restoran/borcan-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/'
    },
    { 
      id: 'trendyol', 
      name: 'Trendyol Yemek', 
      icon: 'ri-restaurant-line', 
      color: 'text-purple-600',
      url: 'https://www.trendyol.com/yemek'
    },
    { 
      id: 'whatsapp', 
      name: 'WhatsApp', 
      icon: 'ri-whatsapp-line', 
      color: 'text-green-600',
      url: 'https://wa.me/905455093462?text=Merhaba! Borcan Kebap\'tan sipariş vermek istiyorum.'
    },
    { 
      id: 'phone', 
      name: 'Telefon: 0212 423 3727', 
      icon: 'ri-phone-line', 
      color: 'text-blue-600',
      url: 'tel:02124233727'
    }
  ];

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
                <span className="text-2xl font-bold text-red-600 font-[`Pacifico`]">
                  Borcan Kebap
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer"
              >
                Menü
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer"
              >
                Hakkımızda
              </Link>
              <Link
                href="/contact"
                className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer"
              >
                İletişim
              </Link>
              <Link
                href="/reviews"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer"
              >
                Yorumlar
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                Rezervasyon
              </button>
              <OrderChannelDropdown />
              <button className="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer">
                <i className="ri-menu-line text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Turkish%20restaurant%20storefront%20with%20elegant%20Borcan%20Kebap%20sign%20in%20beautiful%20calligraphy%2C%20warm%20evening%20lighting%20illuminating%20the%20restaurant%20entrance%2C%20traditional%20Ottoman-style%20architecture%2C%20professional%20photography%20showcasing%20authentic%20Turkish%20dining%20establishment&width=1200&height=400&seq=contact-hero-borcan&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-xl max-w-2xl mx-auto">Bizimle iletişime geçin</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Mesaj Gönderin
              </h2>

              {submitMessage && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  <div className="flex items-center">
                    <i
                      className={`${submitMessage.type === 'success' ? 'ri-check-circle-line' : 'ri-error-warning-line'
                        } mr-2`}
                    ></i>
                    {submitMessage.text}
                  </div>
                </div>
              )}

              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="+90 5xx xxx xx xx"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="reservation">Rezervasyon</option>
                      <option value="complaint">Şikayet</option>
                      <option value="suggestion">Öneri</option>
                      <option value="catering">Catering Hizmetleri</option>
                      <option value="other">Diğer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 karakter
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-line animate-spin mr-2"></i>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line mr-2"></i>
                      Mesajı Gönder
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                İletişim Bilgileri
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Adres
                    </h4>
                    <p className="text-gray-600">
                      Beyoğlu Mahallesi
                      <br />
                      Kebap Sokak No: 123
                      <br />
                      34400 Beyoğlu, İstanbul
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Telefon
                    </h4>
                    <p className="text-gray-600">+90 212 555 0123</p>
                    <p className="text-gray-600">+90 212 555 0124</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      E-posta
                    </h4>
                    <p className="text-gray-600">info@borcankebap.com</p>
                    <p className="text-gray-600">rezervasyon@borcankebap.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-time-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Çalışma Saatleri
                    </h4>
                    <p className="text-gray-600">Pazartesi - Pazar</p>
                    <p className="text-gray-600">11:00 - 23:00</p>
                    <p className="text-sm text-green-600 mt-1">
                      Kesintisiz servis
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Sosyal Medya
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => window.open('https://www.facebook.com/profile.php?id=61579514506784&locale=tr_TR', '_blank')}
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-2xl text-blue-600 mr-3"></i>
                  <span className="font-medium">Facebook</span>
                </button>
                <button 
                  onClick={() => window.open('https://www.instagram.com/borcan_kebap_pide_lahmacun?utm_source=qr&igsh=d2twdW0yZ2FqaGJl', '_blank')}
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-fill text-2xl text-pink-600 mr-3"></i>
                  <span className="font-medium">Instagram</span>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-twitter-fill text-2xl text-blue-400 mr-3"></i>
                  <span className="font-medium">Twitter</span>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-youtube-fill text-2xl text-red-600 mr-3"></i>
                  <span className="font-medium">YouTube</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-red-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Hızlı İşlemler</h3>
              <div className="space-y-4">
                <Link
                  href="/reservation"
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  Rezervasyon Yap
                </Link>
                <div className="relative">
                  <button 
                    onClick={handleOrderClick}
                    className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-shopping-cart-line mr-2"></i>
                    Online Sipariş Ver
                    <i className={`ri-arrow-down-s-line ml-2 transition-transform ${showOrderDropdown ? 'rotate-180' : ''}`}></i>
                  </button>
                  
                  {showOrderDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                      {orderChannels.map(channel => (
                        <button
                          key={channel.id}
                          onClick={() => handleChannelClick(channel)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg cursor-pointer text-gray-800"
                        >
                          <i className={`${channel.icon} ${channel.color} text-lg w-5 h-5 flex items-center justify-center`}></i>
                          <span>{channel.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  href="/menu"
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-restaurant-line mr-2"></i>
                  Menüyü İncele
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            <h3 className="text-2xl font-bold text-gray-800">Konum</h3>
            <p className="text-gray-600 mt-2">
              Bizi haritada bulabilirsiniz <br />
              <span className="text-sm text-gray-500">Plus Code: 2P33+29 Avcılar, İstanbul</span>
            </p>
          </div>
          <div className="h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6360771.36045993!2d23.44249619999998!3d38.88177901825598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa0f19c1fd125%3A0xaf8c01d8d3b4cca7!2sBORCAN%20KEBAP!5e0!3m2!1str!2str!4v1756844318638!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Borcan Kebap Konum"
            ></iframe>
            <div className="p-4 text-center">
              <a
                href="https://maps.app.goo.gl/munYF8UGpoW94CoW9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                Google Haritalarda Aç
              </a>
            </div>
          </div>
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
                <span className="font-[`Pacifico`]">Borcan Kebap</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum
                ile buluşturuyoruz.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/brcnkbp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                <a
                  href="https://www.instagram.com/borcan_kebap_pide_lahmacun?utm_source=qr&igsh=d2twdW0yZ2FqaGJl"
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
                  <Link
                    href="/menu"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Menü
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
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
                    href="https://www.yemeksepeti.com/restaurant/kw28/borcan-kebap-pide-lahmacun-salonu"
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
                    href="https://getir.com/yemek/restoran/borcan-kebap-pide-lahmacun-salonu-mustafa-kemalpasa-mah-avcilar-istanbul/"
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
                    href="https://tgoyemek.com/arama?searchQuery=borcan%20kebap"
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
                    href="https://wa.me/905455093462?text=Merhaba! Borcan Kebap'tan sipariş vermek istiyorum."
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
                    Beyoğlu Caddesi No: 35/A
                    <br />
                    Parseller, Avcılar/İstanbul
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Borcan Kebap. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
