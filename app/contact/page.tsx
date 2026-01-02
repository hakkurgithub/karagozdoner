'use client';

import Link from 'next/link';
import { useState } from 'react';

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

    // Form gönderimini simüle et
    setTimeout(() => {
      setSubmitMessage({
        type: 'success',
        // === DİL DEĞİŞİKLİĞİ ===
        text: 'Üzenetét sikeresen elküldtük! Hamarosan válaszolunk.',
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

  // === BİLGİ VE DİL GÜNCELLEMESİ (Wix siteye göre) ===
  const orderChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'ri-whatsapp-line',
      color: 'text-green-600',
      url: 'https://wa.me/36209341537?text=Helló!%20Karagöz%20Döner-től%20szeretnék%20rendelni.',
    },
    {
      id: 'phone',
      name: 'Telefon: +36 20 934 1537',
      icon: 'ri-phone-line',
      color: 'text-blue-600',
      url: 'tel:06209341537',
    },
    {
      id: 'foodora',
      name: 'Foodora',
      icon: 'ri-restaurant-line',
      color: 'text-pink-600',
      url: '#', // Buraya Foodora linkiniz gelecek
    },
    {
      id: 'wolt',
      name: 'Wolt',
      icon: 'ri-truck-line',
      color: 'text-blue-500',
      url: '#', // Buraya Wolt linkiniz gelecek
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <h1 className="text-5xl font-bold mb-4">Elérhetőség</h1>
            <p className="text-xl max-w-2xl mx-auto">Lépjen kapcsolatba velünk</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {/* === DİL DEĞİŞİKLİĞİ === */}
                Üzenetküldés
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
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Név *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      // === DİL DEĞİŞİKLİĞİ ===
                      placeholder="Az Ön neve"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      E-mail *
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
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      // === DİL DEĞİŞİKLİĞİ ===
                      placeholder="+36 20 xxx xxxx"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Tárgy *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 pr-8"
                    >
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      <option value="">Válasszon tárgyat</option>
                      <option value="reservation">Asztalfoglalás</option>
                      <option value="complaint">Panasz</option>
                      <option value="suggestion">Javaslat</option>
                      <option value="catering">Catering</option>
                      <option value="other">Egyéb</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    Üzenet *
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
                    // === DİL DEĞİŞİKLİĞİ ===
                    placeholder="Írja ide az üzenetét..."
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {/* === DİL DEĞİŞİKLİĞİ === */}
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
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      <i className="ri-loader-line animate-spin mr-2"></i>
                      Küldés...
                    </>
                  ) : (
                    <>
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      <i className="ri-send-plane-line mr-2"></i>
                      Üzenet küldése
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
                {/* === DİL DEĞİŞİKLİĞİ === */}
                Elérhetőségek
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Cím
                    </h4>
                    {/* === ADRES GÜNCELLEMESİ === */}
                    <p className="text-gray-600">
                      2500, Esztergom
                      <br />
                      Kossuth Lajos utca 30.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Telefonszám
                    </h4>
                    {/* === TELEFON GÜNCELLEMESİ === */}
                    <a href="tel:+36209341537" className="text-gray-600 hover:text-red-600 transition-colors">
                      +36 20 934 1537
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-mail-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      E-mail
                    </h4>
                    {/* === E-POSTA GÜNCELLEMESİ === */}
                    <p className="text-gray-600">info@karagozdoner.com</p>
                    <p className="text-gray-600">foglalas@karagozdoner.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-time-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Nyitvatartás
                    </h4>
                    {/* (Varsayılan olarak bırakıldı, Wix sitesinde yoktu) */}
                    <p className="text-gray-600">Hétfő - Vasárnap</p>
                    <p className="text-gray-600">11:00 - 23:00</p>
                    <p className="text-sm text-green-600 mt-1">
                      Folyamatos kiszolgálás
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {/* === DİL DEĞİŞİKLİĞİ === */}
                Közösségi Média
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {/* === SOSYAL MEDYA GÜNCELLEMESİ (Wix siteye göre) === */}
                <button
                  onClick={() => window.open('https://www.facebook.com/profile.php?id=61560428630473', '_blank')}
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-2xl text-blue-600 mr-3"></i>
                  <span className="font-medium">Facebook</span>
                </button>
                {/* Diğer sosyal medya butonları kaldırıldı (Wix sitesinde yok) */}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-red-600 text-white rounded-xl p-8">
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <h3 className="text-2xl font-bold mb-4">Gyors Műveletek</h3>
              <div className="space-y-4">
                <Link
                  href="/reservation"
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  {/* === DİL DEĞİŞİKLİĞİ === */}
                  Asztalfoglalás
                </Link>
                <div className="relative">
                  <button
                    onClick={handleOrderClick}
                    className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-shopping-cart-line mr-2"></i>
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    Online Rendelés
                    <i
                      className={`ri-arrow-down-s-line ml-2 transition-transform ${
                        showOrderDropdown ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>

                  {showOrderDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                      {orderChannels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => handleChannelClick(channel)}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg cursor-pointer text-gray-800"
                        >
                          <i
                            className={`${channel.icon} ${channel.color} text-lg w-5 h-5 flex items-center justify-center`}
                          ></i>
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
                  {/* === DİL DEĞİŞİKLİĞİ === */}
                  Menü Megtekintése
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 border-b">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <h3 className="text-2xl font-bold text-gray-800">Helyszín</h3>
            <p className="text-gray-600 mt-2">
              {/* === DİL DEĞİŞİKLİĞİ === */}
              Találjon meg minket a térképen
            </p>
          </div>
          <div className="h-96">
            {/* === HARİTA GÜNCELLEMESİ (Esztergom) === */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2678.786523173356!2d18.73977821563815!3d47.79152007919747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476a617631a29c1d%3A0xadeba8fea0603e1a!2sEsztergom%2C%20Kossuth%20Lajos%20u.%2030%2C%202500%20Hungary!5e0!3m2!1sen!2sus!4v1675865432109!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              // === İSİM GÜNCELLEMESİ ===
              title="Karagöz Döner Helyszín"
            ></iframe>
            <div className="p-4 text-center">
              <a
                // === HARİTA LİNK GÜNCELLEMESİ (Esztergom) ===
                href="https://www.google.com/maps/place/Esztergom,+Kossuth+Lajos+u.+30,+2500+Hungary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline"
              >
                {/* === DİL DEĞİŞİKLİĞİ === */}
                Megnyitás Google Térképen
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}