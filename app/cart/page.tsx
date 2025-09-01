
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const orderText = items.map(item => 
      `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)}₺`
    ).join('\n');
    
    const totalText = `\n\nToplam: ${getTotalPrice().toFixed(0)}₺`;
    const fullMessage = `Merhaba! Borcan Kebap'tan sipariş vermek istiyorum:\n\n${orderText}${totalText}`;
    
    const phoneNumber = '905455093462';
    const encodedMessage = encodeURIComponent(fullMessage);
    
    // Cihaz türü kontrolü
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobil cihazlar için - önce uygulama dene
      const whatsappAppUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
      window.location.href = whatsappAppUrl;
      
      // 2 saniye sonra web versiyonunu aç
      setTimeout(() => {
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      }, 2000);
    } else {
      // Masaüstü için - + işareti ile web WhatsApp
      window.open(`https://web.whatsapp.com/send?phone=+${phoneNumber}&text=${encodedMessage}`, '_blank');
      
      // 1 saniye sonra alternatif olarak wa.me linkini aç
      setTimeout(() => {
        window.open(`https://wa.me/+${phoneNumber}?text=${encodedMessage}`, '_blank');
      }, 1000);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">
                    BK
                  </div>
                  <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
                    Borcan Kebap
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <div className="py-16 px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
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
                  <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
                    Borcan Kebap
                  </span>
                </Link>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                  Ana Sayfa
                </Link>
                <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                  Menü
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                  Hakkımızda
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                  İletişim
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-6">
              Henüz sepetinizde ürün bulunmuyor. Lezzetli yemeklerimizi keşfetmek için menümüze göz atın!
            </p>
            <Link
              href="/menu"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer"
            >
              Menüye Git
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="text-2xl font-bold text-red-600 font-['Pacifico']">
                  Borcan Kebap
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Ana Sayfa
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Menü
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                Hakkımızda
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors cursor-pointer">
                İletişim
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Sepetim</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Sipariş Detayları</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Sepeti Temizle
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">{item.price}₺</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                        >
                          <i className="ri-subtract-line"></i>
                        </button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 cursor-pointer ml-4"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                      
                      <div className="text-right ml-4">
                        <span className="font-bold text-red-600">
                          {(item.price * item.quantity).toFixed(0)}₺
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{getTotalPrice().toFixed(0)}₺</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Teslimat</span>
                    <span className="text-green-600">Ücretsiz</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Toplam</span>
                      <span className="text-red-600">{getTotalPrice().toFixed(0)}₺</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors cursor-pointer mb-3"
                >
                  WhatsApp ile Sipariş Ver
                </button>

                <Link
                  href="/menu"
                  className="w-full block text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Alışverişe Devam Et
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}