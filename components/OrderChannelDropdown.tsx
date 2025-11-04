// components/OrderChannelDropdown.tsx
"use client";

import React from "react";
import { useCart } from "./CartProvider";

export default function OrderChannelDropdown() {
  const { sendOrderToWhatsApp } = useCart();

  const handleOrderClick = () => {
    sendOrderToWhatsApp();
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleOrderClick}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium cursor-pointer"
      >
        Rendelés WhatsAppon
      </button>
    </div>
  );
}