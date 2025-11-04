'use client';

import Link from 'next/link';
import { useState } from 'react';
import ReservationModal from '../../components/ReservationModal';
import OrderChannelDropdown from '../../components/OrderChannelDropdown';

export default function ReservationPage() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);

  const timeSlots = [
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
  ];
  
  const handleQuickReservation = () => {
    // 1) Dátum vagy időpont hiányában a régi modalt nyissa meg (opcionális)
    if (!selectedDate || !selectedTime) {
      setShowReservationModal(true);
      return;
    }

    // 2) === DİL GÜNCELLEMESİ (Tarih formatı) ===
    const dateHu = new Date(selectedDate).toLocaleDateString('hu-HU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    // === DİL, İSİM VE TELEFON GÜNCELLEMESİ ===
    const message = `Helló!
Asztalfoglalást szeretnék a Karagöz Döner-nél:
📅 Dátum: ${dateHu}
🕒 Időpont: ${selectedTime}
👥 Vendégek száma: ${guests}
Köszönöm!`;

    const phone = '36209341537'; // Új Magyar telefonszám
    const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                {/* === İSİM GÜNCELLEMESİ (Logo) === */}
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                  KD
                </div>
                <span className="text-2xl font-bold text-red-600 font-[\'Pacifico\']">
                  Karagöz Döner
                </span>
              </Link>
            </div>
            {/* === DİL GÜNCELLEMESİ (Navigasyon) === */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Kezdőlap
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Menü
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Rólunk
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Elérhetőség
              </Link>
              <Link href="/reservation" className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer">
                Foglalás
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={handleQuickReservation} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer">
                {/* === DİL GÜNCELLEMESİ === */}
                Foglalás
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
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20restaurant%20interior%20with%20beautifully%20set%20tables%2C%20warm%20ambient%20lighting%2C%20romantic%20dining%20atmosphere%2C%20Turkish%20restaurant%20decor%2C%20white%20tablecloths%2C%20professional%20restaurant%20photography%2C%20inviting%20dining%20space%20for%20reservations&width=1200&height=400&seq=reservation-hero&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            {/* === DİL VE İSİM GÜNCELLEMESİ === */}
            <h1 className="text-5xl font-bold mb-4">Asztalfoglalás</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Foglaljon asztalt a Karagöz Döner-nél egy felejthetetlen gasztronómiai élményért
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Reservation Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              <i className="ri-calendar-line mr-3 text-red-600"></i>
              {/* === DİL GÜNCELLEMESİ === */}
              Asztalfoglalás
            </h2>
            
            <div className="space-y-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {/* === DİL GÜNCELLEMESİ === */}
                  Dátum
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {/* === DİL GÜNCELLEMESİ === */}
                  Vendégek száma
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(12, guests + 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                {/* === DİL GÜNCELLEMESİ === */}
                <p className="text-sm text-gray-500 mt-1">Maximum 12 fő</p>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {/* === DİL GÜNCELLEMESİ === */}
                  Időpont
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                        selectedTime === time
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Reservation Button */}
              <button
                onClick={handleQuickReservation}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer flex items-center justify-center"
              >
                <i className="ri-calendar-check-line mr-2 text-lg"></i>
                {/* === DİL GÜNCELLEMESİ === */}
                Foglalás Most
              </button>
            </div>
          </div>

          {/* Restaurant Info & Special Offers */}
          <div className="space-y-8">
            {/* Restaurant Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {/* === DİL GÜNCELLEMESİ === */}
                Foglalási Információk
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-time-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    {/* === DİL GÜNCELLEMESİ === */}
                    <h4 className="font-semibold text-gray-800 mb-1">Nyitvatartás</h4>
                    <p className="text-gray-600">Minden nap 11:00 - 23:00</p>
                    <p className="text-sm text-green-600">Folyamatos kiszolgálás</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-phone-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    {/* === DİL GÜNCELLEMESİ === */}
                    <h4 className="font-semibold text-gray-800 mb-1">Foglalási Vonal</h4>
                    {/* === TELEFON GÜNCELLEMESİ === */}
                    <p className="text-gray-600">06 20 934 1537</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-map-pin-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    {/* === DİL GÜNCELLEMESİ === */}
                    <h4 className="font-semibold text-gray-800 mb-1">Cím</h4>
                    {/* === ADRES GÜNCELLEMESİ === */}
                    <p className="text-gray-600">
                      2500, Esztergom<br/>
                      Kossuth Lajos utca 30.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <i className="ri-user-line text-xl text-red-600"></i>
                  </div>
                  <div>
                    {/* === DİL GÜNCELLEMESİ === */}
                    <h4 className="font-semibold text-gray-800 mb-1">Kapacitás</h4>
                    <p className="text-gray-600">Tágas étterem</p>
                    <p className="text-gray-600">Csoportos foglalás lehetséges</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-gradient-to-br from-red-600 to-orange-600 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                <i className="ri-gift-line mr-2"></i>
                {/* === DİL GÜNCELLEMESİ === */}
                Különleges Ajánlatok
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  {/* === DİL GÜNCELLEMESİ === */}
                  <h4 className="font-semibold mb-2">🎂 Születésnapi Meglepetés</h4>
                  <p className="text-sm opacity-90">
                    Ingyenes torta és meglepetés születésnapi foglalások esetén
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  {/* === DİL GÜNCELLEMESİ === */}
                  <h4 className="font-semibold mb-2">👨👩👧👦 Családi Menü</h4>
                  <p className="text-sm opacity-90">
                    15% kedvezmény 4+ fős foglalások esetén
                  </p>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4">
                  {/* === DİL GÜNCELLEMESİ === */}
                  <h4 className="font-semibold mb-2">🎵 Élő Zene</h4>
                  <p className="text-sm opacity-90">
                    Péntek és szombat este élő török zene
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {/* === DİL GÜNCELLEMESİ === */}
                Gyors Elérhetőség
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* === TELEFON GÜNCELLEMESİ === */}
                <a href="tel:06209341537" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-phone-fill text-2xl text-green-600 mb-2"></i>
                  {/* === DİL GÜNCELLEMESİ === */}
                  <span className="font-medium">Hívás</span>
                  <span className="text-xs text-gray-500">06 20 934 1537</span>
                </a>
                
                {/* === TELEFON VE LİNK GÜNCELLEMESİ === */}
                <a href="https://wa.me/36209341537?text=Helló!%20Asztalfoglalást%20szeretnék." target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <i className="ri-whatsapp-fill text-2xl text-green-600 mb-2"></i>
                  <span className="font-medium">WhatsApp</span>
                  <span className="text-xs text-gray-500">06 20 934 1537</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Reservation Rules */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            <i className="ri-information-line mr-2 text-blue-600"></i>
            {/* === DİL GÜNCELLEMESİ === */}
            Foglalási Szabályzat
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-time-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GÜNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Késés</h4>
                <p className="text-sm text-gray-600">15 percnél hosszabb késés esetén a foglalás törlésre kerülhet.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-close-circle-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GÜNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Lemondás</h4>
                <p className="text-sm text-gray-600">A foglalás lemondását legalább 2 órával korábban jelezni kell.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-user-3-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GÜNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Csoportos foglalás</h4>
                <p className="text-sm text-gray-600">8+ fős csoportos foglalás esetén kérjük, hívjon minket.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-calendar-check-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GÜNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Visszaigazolás</h4>
                <p className="text-sm text-gray-600">Foglalását telefonon erősítjük meg.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-restaurant-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GÜNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Különleges étrend</h4>
                <p className="text-sm text-gray-600">Kérjük, foglaláskor jelezze különleges étrendi igényeit.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <i className="ri-gift-line text-blue-600"></i>
              </div>
              <div>
                {/* === DİL GİNCELLEMESİ === */}
                <h4 className="font-semibold text-gray-800 mb-1">Különleges alkalmak</h4>
                <p className="text-sm text-gray-600">Kérjük, foglaláskor jelezze a születésnapokat és különleges alkalmakat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (Wix siteye göre güncellendi) */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                {/* === İSİM GÜNCELLEMESİ (Logo) === */}
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-lg border-2 border-black">
                  KD
                </div>
                <span className="font-[\'Pacifico\']">Karagöz Döner</span>
              </h3>
              {/* === DİL GÜNCELLEMESİ === */}
              <p className="text-gray-400 mb-4">
                A hagyományos török konyha egyedülálló ízei Esztergomban.
              </p>
              <div className="flex space-x-4">
                {/* === SOSYAL MEDYA GÜNCELLEMESİ (Facebook) === */}
                <a href="https://www.facebook.com/profile.php?id=61560428630473" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="ri-facebook-fill text-lg"></i>
                </a>
                {/* Diğerleri kaldırıldı */}
              </div>
            </div>

            <div>
              {/* === DİL GÜNCELLEMESİ (Hızlı Linkler) === */}
              <h4 className="text-lg font-semibold mb-4">Gyors linkek</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/menu" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Menü
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Rólunk
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Elérhetőség
                  </Link>
                </li>
                <li>
                  <Link href="/reservation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Foglalás
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              {/* === DİL VE SİPARİŞ KANALI GÜNCELLEMESİ === */}
              <h4 className="text-lg font-semibold mb-4">Online Rendelés</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" /* Foodora linki buraya */ target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-restaurant-line mr-2 text-pink-600"></i>
                    Foodora
                  </a>
                </li>
                <li>
                  <a href="#" /* Wolt linki buraya */ target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-truck-line mr-2 text-blue-500"></i>
                    Wolt
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/36209341537?text=Helló!%20Karagöz%20Döner-től%20szeretnék%20rendelni." target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center">
                    <i className="ri-whatsapp-line mr-2 text-green-600"></i>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              {/* === DİL, TELEFON, E-POSTA VE ADRES GÜNCELLEMESİ === */}
              <h4 className="text-lg font-semibold mb-4">Elérhetőség</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i className="ri-phone-line mr-2"></i>
                  06 20 934 1537
                </li>
                <li className="flex items-center">
                  <i className="ri-mail-line mr-2"></i>
                  info@karagozdoner.com
                </li>
                <li className="flex items-start">
                  <i className="ri-map-pin-line mr-2 mt-1"></i>
                  <a
                    href="https://www.google.com/maps/place/Esztergom,+Kossuth+Lajos+u.+30,+2500+Hungary" // Esztergom harita linki
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    2500, Esztergom
                    <br />
                    Kossuth Lajos utca 30.
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            {/* === İSİM GÜNCELLEMESİ === */}
            <p>© 2024 Karagöz Döner. Minden jog fenntartva.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={showReservationModal} 
        onClose={() => setShowReservationModal(false)} 
      />
    </div>
  );
}