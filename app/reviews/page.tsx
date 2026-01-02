'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// === DİL GÜNCELLEMESİ (Mock veriler Macarcaya çevrildi) ===
interface GoogleReview {
  id?: string;
  author_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  relative_time_description: string;
  profile_photo_url: string;
}

interface RestaurantInfo {
  rating: number;
  total_reviews: number;
}

// Mock reviews data (Magyar)
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Nagy Péter',
    rating: 5,
    review_text: 'Nagyszerű élmény volt! Az Adana kebab csodálatos volt, a hús nagyon ízletes és friss. A személyzet nagyon segítőkész. Biztosan visszatérek még.',
    review_date: new Date().toISOString(),
    relative_time_description: '2 nappal ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Nagy Péter')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '2',
    author_name: 'Kovács Anna',
    rating: 4,
    review_text: 'A pidéjük nagyon finom, különösen a húsos pide, és a csirkés dürüm is ízletes volt. Az árak mérsékeltek, a hangulat barátságos.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 héttel ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Kovács Anna')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '3',
    author_name: 'Tóth Gábor',
    rating: 5,
    review_text: 'Tökéletes kebabozó. Tisztaság, íz és kiszolgálás tekintetében nincs hiányosság. Mindenkinek ajánlom.',
    review_date: new Date().toISOString(),
    relative_time_description: '1 hónappal ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Tóth Gábor')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '4',
    author_name: 'Szabó Eszter',
    rating: 3,
    review_text: 'Az íze nem rossz, de a kiszolgálás kicsit lassú volt. Csúcsidőben mentünk, talán emiatt.',
    review_date: new Date().toISOString(),
    relative_time_description: '2 hónappal ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Szabó Eszter')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '5',
    author_name: 'Varga János',
    rating: 5,
    review_text: 'Aki a hagyományos ízeket keresi, annak ez a megfelelő hely. A lavaş, az ezme és a mezzék is fantasztikusak. 5/5 pont.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 hónappal ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Varga János')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '6',
    author_name: 'Molnár Zsófia',
    rating: 4,
    review_text: 'Családdal érkeztünk és nagyon elégedettek voltunk. Gyerekeknek is vannak megfelelő menü opciók. Köszönjük.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 hónappal ezelőtt',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Molnár Zsófia')}&size=60&background=f59e0b&color=ffffff`
  },
];

// Mock restaurant info
const mockRestaurantInfo: RestaurantInfo = {
  rating: 4.8,
  total_reviews: 235,
};

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i key={`full-${i}`} className="ri-star-fill text-yellow-400"></i>,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <i key="half" className="ri-star-half-fill text-yellow-400"></i>,
    );
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <i key={`empty-${i}`} className="ri-star-line text-yellow-400"></i>,
    );
  }

  return <div className="flex space-x-0.5">{stars}</div>;
}

export default function ReviewsPage() {
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const handleOrderClick = () => {
    setShowOrderDropdown(!showOrderDropdown);
  };

  const handleChannelClick = (channel: any) => {
    if (channel.url) {
      window.open(channel.url, '_blank');
    }
    setShowOrderDropdown(false);
  };

  // === İLETİŞİM VE SİPARİŞ KANALI GÜNCELLEMESİ (Macaristan) ===
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
          backgroundImage: `url('https://raw.githubusercontent.com/hakkurgithub/images/main/hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            {/* === DİL VE İSİM GÜNCELLEMESİ === */}
            <h1 className="text-5xl font-bold mb-4">Vendégértékelések</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Vendégeink véleménye a Karagöz Döner-ről
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Reviews List */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                  {/* === DİL GÜNCELLEMESİ === */}
                  Vendégértékelések
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-red-600">
                    {mockRestaurantInfo.rating}
                  </span>
                  <StarRating rating={mockRestaurantInfo.rating} />
                  <span className="text-gray-500 text-sm">
                    {/* === DİL GÜNCELLEMESİ === */}
                    ({mockRestaurantInfo.total_reviews} értékelés)
                  </span>
                </div>
              </div>

              <div className="space-y-8">
                {mockReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {review.author_name}
                        </h4>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {review.review_text}
                    </p>
                    <div className="text-sm text-gray-500">
                      {review.relative_time_description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            {/* Google Reviews */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
                <i className="ri-google-fill text-2xl text-blue-500"></i>
                {/* === DİL GÜNCELLEMESİ === */}
                <span>Google Értékelések</span>
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-6xl font-bold text-red-600">
                  {mockRestaurantInfo.rating}
                </div>
                <div>
                  <StarRating rating={mockRestaurantInfo.rating} />
                  <p className="text-gray-500 mt-1">
                    {/* === DİL GÜNCELLEMESİ === */}
                    {mockRestaurantInfo.total_reviews} értékelés
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                {/* === DİL GÜNCELLEMESİ === */}
                Megtekintheti vendégeink értékeléseit és véleményeit.
              </p>
              <a
                // === HARİTA LİNK GÜNCELLEMESİ (Esztergom) ===
                href="https://www.google.com/maps/place/Esztergom,+Kossuth+Lajos+u.+30,+2500+Hungary"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-red-600 font-semibold hover:underline"
              >
                {/* === DİL GÜNCELLEMESİ === */}
                Összes értékelés megtekintése
                <i className="ri-arrow-right-line ml-1"></i>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="bg-red-600 text-white rounded-xl p-8">
              {/* === DİL GÜNCELLEMESİ === */}
              <h3 className="text-2xl font-bold mb-4">Gyors Műveletek</h3>
              <div className="space-y-4">
                <Link
                  href="/reservation"
                  className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  {/* === DİL GÜNCELLEMESİ === */}
                  Asztalfoglalás
                </Link>
                <div className="relative">
                  <button
                    onClick={handleOrderClick}
                    className="w-full bg-white text-red-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <i className="ri-shopping-cart-line mr-2"></i>
                    {/* === DİL GÜNCELLEMESİ === */}
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
                  {/* === DİL GÜNCELLEMESİ === */}
                  Menü Megtekintése
                </Link>
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
                  <a href="/reservation" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    Foglalás
                  </a>
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
                  +36 20 934 1537
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
    </div>
  );
}