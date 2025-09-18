'use client';

import { useState } from 'react';
import { useContent } from '../hooks/useContent';

export default function OrderChannelDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useContent();

  const channels = [
    {
      id: 'yemeksepeti',
      name: 'Yemeksepeti',
      icon: 'ri-restaurant-line',
      color: 'text-orange-600',
      url: content.orderChannels?.yemeksepeti?.url,
      active: content.orderChannels?.yemeksepeti?.active
    },
    {
      id: 'getir',
      name: 'Getir',
      icon: 'ri-truck-line',
      color: 'text-yellow-600',
      url: content.orderChannels?.getir?.url,
      active: content.orderChannels?.getir?.active
    },
    {
      id: 'tgoyemek',
      name: content.orderChannels?.tgoyemek?.text || 'TGOYemek',
      icon: 'ri-restaurant-line',
      color: 'text-purple-600',
      url: content.orderChannels?.tgoyemek?.url,
      active: content.orderChannels?.tgoyemek?.active
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Sipariş',
      icon: 'ri-whatsapp-line',
      color: 'text-green-600',
      url: content.orderChannels?.whatsapp?.url,
      active: content.orderChannels?.whatsapp?.active
    }
  ];

  const activeChannels = channels.filter(channel => channel.active);

  const handleChannelClick = (channel: any) => {
    if (channel.url) {
      window.open(channel.url, '_blank');
    }
    setIsOpen(false);
  };

  if (activeChannels.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium whitespace-nowrap cursor-pointer flex items-center"
      >
        <i className="ri-shopping-cart-line mr-2"></i>
        Sipariş Ver
        <i className={`ri-arrow-down-s-line ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
          {activeChannels.map((channel) => (
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

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}