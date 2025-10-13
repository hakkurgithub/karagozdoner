"use client";

import React from "react";
import { useCart } from "./CartProvider"; // ✅ CartProvider'dan hook'umuzu import ediyoruz.

export default function OrderChannelDropdown() {
  // 1. Sadece ihtiyacımız olan 'sendOrderToWhatsApp' fonksiyonunu CartProvider'dan alıyoruz.
  const { sendOrderToWhatsApp } = useCart();

  const handleOrderClick = () => {
    // 2. Merkezi sipariş gönderme fonksiyonumuzu çağırıyoruz.
    // Bu buton genel bir buton olduğu için masa/adres/not bilgisi gönderemez.
    // Bu yüzden bu alanları boş ('') gönderiyoruz.
    // Fonksiyonumuz zaten bu alanlar boşsa mesaja eklemiyor, bu yüzden sorun olmaz.
    sendOrderToWhatsApp('', '', '');
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleOrderClick} // ✅ Butonun tıklanma olayını yeni fonksiyonumuza bağlıyoruz.
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
      >
        WhatsApp’tan Sipariş Ver
      </button>
    </div>
  );
}