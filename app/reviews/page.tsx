'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


// Mock data for reviews since we don't have the lib file
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

// Mock reviews data
const mockReviews: GoogleReview[] = [
  {
    id: '1',
    author_name: 'Ahmet Yılmaz',
    rating: 5,
    review_text: 'Harika bir deneyimdi! Adana kebabı muhteşemdi, et çok lezzetli ve tazeydi. Personel çok ilgili. Kesinlikle tekrar geleceğim.',
    review_date: new Date().toISOString(),
    relative_time_description: '2 gün önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Ahmet Yılmaz')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '2',
    author_name: 'Fatma Özkan',
    rating: 4,
    review_text: 'Pideleri çok güzel, özellikle kuşbaşılı pide ve tavuk dürümü de lezizdi. Fiyatlar makul, ortam sıcak.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 hafta önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Fatma Özkan')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '3',
    author_name: 'Mehmet Kara',
    rating: 5,
    review_text: 'Dört dörtlük bir kebapçı. Temizlik, lezzet ve hizmet konusunda hiçbir eksiği yok. Herkese tavsiye ederim.',
    review_date: new Date().toISOString(),
    relative_time_description: '1 ay önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Mehmet Kara')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '4',
    author_name: 'Ayşe Demir',
    rating: 3,
    review_text: 'Lezzet fena değil, ancak servis biraz yavaştı. Yoğun bir saatte gittik, belki ondandır.',
    review_date: new Date().toISOString(),
    relative_time_description: '2 ay önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Ayşe Demir')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '5',
    author_name: 'Can Vural',
    rating: 5,
    review_text: 'Geleneksel lezzetleri arayanlar için doğru adres. Lavaşları, ezmesi ve mezeleri harika. Puanım 5/5.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 ay önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Can Vural')}&size=60&background=f59e0b&color=ffffff`
  },
  {
    id: '6',
    author_name: 'Gizem Aksoy',
    rating: 4,
    review_text: 'Ailecek geldik ve çok memnun kaldık. Çocuklar için de uygun menü seçenekleri var. Teşekkürler.',
    review_date: new Date().toISOString(),
    relative_time_description: '3 ay önce',
    profile_photo_url: `https://ui-avatars.com/api/?name=${encodeURIComponent('Gizem Aksoy')}&size=60&background=f59e0b&color=ffffff`
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

  const orderChannels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'ri-whatsapp-line',
      color: 'text-green-600',
      url: 'https://wa.me/905455093462?text=Merhaba! Borcan Kebap\'tan sipariş vermek istiyorum.',
    },
    {
      id: 'phone',
      name: 'Telefon: 0212 423 3727',
      icon: 'ri-phone-line',
      color: 'text-blue-600',
      url: 'tel:02124233727',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Turkish%20restaurant%20review%20page%20customer%20testimonials%20with%20authentic%20Turkish%20food%20photos%2C%20modern%20restaurant%20interior%2C%20warm%20lighting%2C%20social%20proof%20and%20high%20ratings%2C%20professional%20photography%2C%20user-generated%20content&width=1200&height=400&seq=reviews-hero&orientation=landscape')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4">Müşteri Yorumları</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Misafirlerimizin Borcan Kebap hakkındaki düşünceleri
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
                  Misafir Yorumları
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-red-600">
                    {mockRestaurantInfo.rating}
                  </span>
                  <StarRating rating={mockRestaurantInfo.rating} />
                  <span className="text-gray-500 text-sm">
                    ({mockRestaurantInfo.total_reviews} yorum)
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
                <span>Google Yorumları</span>
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-6xl font-bold text-red-600">
                  {mockRestaurantInfo.rating}
                </div>
                <div>
                  <StarRating rating={mockRestaurantInfo.rating} />
                  <p className="text-gray-500 mt-1">
                    {mockRestaurantInfo.total_reviews} yorum
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Misafirlerimizin bize verdiği puanları ve yorumları
                inceleyebilirsiniz.
              </p>
              <a
                href="https://www.google.com/maps/place/Borcan+Kebap+Pide+Lahmacun+Salonu/@41.0028292,28.7061732,17z/data=!4m8!3m7!1s0x14c0a514d4e21a81:0x51480f8365111100!8m2!3d41.0028292!4d28.7083619!9m1!1b1!16s%2Fg%2F1tf70s22?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-red-600 font-semibold hover:underline"
              >
                Tüm Yorumları Gör
                <i className="ri-arrow-right-line ml-1"></i>
              </a>
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
                  Menüyü İncele
                </Link>
              </div>
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
                Geleneksel Türk mutfağının eşsiz lezzetlerini modern sunum ile
                buluşturuyoruz.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61579514506784&locale=tr_TR"
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
                    href="/reservation"
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
            <p>© 2024 Borcan Kebap. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}