
'use client';

import { useState } from 'react';

export default function OrderChannelDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const channels = [
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

  const handleChannelClick = (channel: any) => {
    if (channel.id === 'whatsapp') {
      const message = 'Merhaba! Borcan Kebap\'tan sipariş vermek istiyorum.';
      const phoneNumber = '905455093462';
      const encodedMessage = encodeURIComponent(message);
      
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Mobil için önce uygulama dene
        const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.location.href = whatsappAppUrl;
        
        // 2 saniye sonra web versiyonu
        setTimeout(() => {
          window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        }, 2000);
      } else {
        // Masaüstü için + işareti ile web WhatsApp
        window.open(`https://web.whatsapp.com/send?phone=+${phoneNumber}&text=${encodedMessage}`, '_blank');
        
        // 1 saniye sonra alternatif
        setTimeout(() => {
          window.open(`https://wa.me/+${phoneNumber}?text=${encodedMessage}`, '_blank');
        }, 1000);
      }
    } else if (channel.url) {
      window.open(channel.url, '_blank');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 flex items-center space-x-2 whitespace-nowrap cursor-pointer"
      >
        <span>Online Sipariş</span>
        <i className={`ri-arrow-down-s-line transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg z-10 min-w-56">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => handleChannelClick(channel)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
            >
              <i className={`${channel.icon} ${channel.color} text-lg w-5 h-5 flex items-center justify-center`}></i>
              <span className="text-gray-800">{channel.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}