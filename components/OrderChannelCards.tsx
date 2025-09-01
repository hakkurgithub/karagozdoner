'use client';

interface OrderChannelCardsProps {
  onChannelSelect: (channel: string) => void;
}

export default function OrderChannelCards({ onChannelSelect }: OrderChannelCardsProps) {
  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Sipariş',
      description: 'Hızlı ve kolay sipariş',
      icon: 'ri-whatsapp-line',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    {
      id: 'phone',
      name: 'Telefon Sipariş',
      description: 'Doğrudan arayın',
      icon: 'ri-phone-line',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    {
      id: 'yemeksepeti',
      name: 'Yemeksepeti',
      description: 'Online sipariş platformu',
      icon: 'ri-restaurant-line',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      id: 'getir',
      name: 'Getir Yemek',
      description: 'Hızlı teslimat',
      icon: 'ri-truck-line',
      color: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {channels.map(channel => (
        <button
          key={channel.id}
          onClick={() => onChannelSelect(channel.id)}
          className={`p-4 rounded-lg border-2 ${channel.color} hover:shadow-md transition-all duration-200 text-center`}
        >
          <div className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center`}>
            <i className={`${channel.icon} ${channel.iconColor} text-2xl`}></i>
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">{channel.name}</h3>
          <p className="text-sm text-gray-600">{channel.description}</p>
        </button>
      ))}
    </div>
  );
}