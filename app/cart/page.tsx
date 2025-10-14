'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';

type FormData = { address: string; phone: string; payment: 'K.K.' | 'Nakit' };

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState<FormData>({ address: '', phone: '', payment: 'Nakit' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // WhatsApp sipariş gönderme fonksiyonu: sipariş işletme numarasına gider
  const sendOrderToWhatsApp = (address?: string, phone?: string, notes?: string) => {
    const orderItemsText = items
      .map(
        (item) =>
          `${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(0)}₺`
      )
      .join('\n');

    const totalPriceText = `\n\nToplam: ${getTotalPrice().toFixed(0)}₺`;

    let message = `Merhaba! Borcan Kebap'tan sipariş vermek istiyorum:\n\n${orderItemsText}${totalPriceText}`;

    if (address) message += `\n\nAdres: ${address}`;
    if (phone) message += `\nTelefon: ${phone}`;
    if (notes) message += `\nNot: ${notes}`;

    const phoneNumber = '905455093462'; // İşletmenin WhatsApp numarası (sabit)
    const encodedMessage = encodeURIComponent(message);

    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    sendOrderToWhatsApp(form.address, form.phone);
    clearCart();
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600">Sepetim</h1>

        {items.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-700 mb-4">Sepetinizde ürün bulunmamaktadır.</p>
            <Link
              href="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors"
            >
              Menüye Geri Dön
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sepet Öğeleri */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-6 border-b pb-4 text-gray-800">Sipariş Listesi</h2>
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-4 border-b">
                      <div className="flex items-center">
                        <span className="text-xl font-medium text-gray-800 w-8 text-center">{item.quantity}x</span>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm">{item.price} ₺</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-800">Toplam:</span>
                    <span className="text-2xl font-bold text-red-600">{getTotalPrice()} ₺</span>
                  </div>
                </div>
              </div>

              {/* Sipariş Formu */}
              <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-4 text-gray-800">Sipariş Bilgileri</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adres</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefon</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="payment" className="block text-sm font-medium text-gray-700">Ödeme Şekli</label>
                    <select
                      id="payment"
                      name="payment"
                      value={form.payment}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      required
                    >
                      <option value="Nakit">Nakit</option>
                      <option value="K.K.">Kredi Kartı</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
                  >
                    Siparişi Tamamla
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
