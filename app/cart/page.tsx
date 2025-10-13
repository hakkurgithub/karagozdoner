<<<<<<< HEAD
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartProvider';
=======
"use client";

import { useCart } from "../../components/CartProvider";
import { useState } from "react";
import Link from "next/link";
>>>>>>> 1f5b1163 (İlk yükleme)

type FormData = { address: string; phone: string; payment: 'K.K.' | 'Nakit' };

export default function CartPage() {
<<<<<<< HEAD
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState<FormData>({ address: '', phone: '', payment: 'Nakit' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => setIsClient(true), []);

  /* ----------  YENİ WHATSAPP + FORM  ---------- */
  const sendOrderToWhatsApp = () => {
    if (items.length === 0) return alert('Sepetiniz boş.');
    setShowForm(true);
  };

  const finalizeOrder = () => {
    if (!form.address || !form.phone) return alert('Lütfen adres ve telefon girin.');
    const phoneRaw = '905455093462'; // işletme numarası
    const products = items
      .map((i) => `• ${i.name}  x${i.quantity}  →  ₺${(i.price * i.quantity).toFixed(0)}`)
      .join('%0A');
    const total = getTotalPrice().toFixed(0);
    const msg =
      `Yeni Sipariş%0A` +
      `-----------------%0A` +
      products +
      `%0A-----------------%0A` +
      `Toplam: ₺${total}%0A` +
      `Adres: ${form.address}%0A` +
      `Telefon: ${form.phone}%0A` +
      `Ödeme: ${form.payment}`;
    window.open(`https://wa.me/${phoneRaw}?text=${msg}`, '_blank');
    clearCart();
    setShowForm(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">BK</div>
                <span className="text-2xl font-bold text-red-600 font-['Pacifico']">Borcan Kebap</span>
              </Link>
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
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">BK</div>
                <span className="text-2xl font-bold text-red-600 font-['Pacifico']">Borcan Kebap</span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Ana Sayfa</Link>
                <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium">Menü</Link>
                <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">Hakkımızda</Link>
                <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">İletişim</Link>
              </nav>
            </div>
          </div>
        </header>
        <div className="py-16 px-4 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6"><i className="ri-shopping-cart-line text-4xl text-gray-400"></i></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sepetiniz Boş</h1>
          <p className="text-gray-600 mb-6">Henüz sepetinizde ürün bulunmuyor. Lezzetli yemeklerimizi keşfetmek için menümüze göz atın!</p>
          <Link href="/menu" className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700">Menüye Git</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">BK</div>
              <span className="text-2xl font-bold text-red-600 font-['Pacifico']">Borcan Kebap</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Ana Sayfa</Link>
              <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium">Menü</Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium">Hakkımızda</Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium">İletişim</Link>
            </nav>
=======
  const { items, removeItem, clearCart, getTotalPrice, sendOrderToWhatsApp, updateQuantity } = useCart();
  const [masa, setMasa] = useState("");
  const [adres, setAdres] = useState("");
  const [not, setNot] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-700">🛒 Sepetim</h1>

        {items.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 mb-4">Sepetiniz şu anda boş.</p>
            <Link
              href="/menu"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Menüye Geri Dön
            </Link>
>>>>>>> 1f5b1163 (İlk yükleme)
          </div>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4"
                >
                  <div className="mb-2 sm:mb-0">
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.price} ₺</p>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center font-bold"
                      aria-label="Azalt"
                    >
                      −
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center font-bold"
                      aria-label="Artır"
                    >
                      ＋
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4 transition-colors"
                      aria-label={`${item.name} ürününü kaldır`}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-right mt-6 border-t pt-4">
              <p className="text-xl font-bold text-red-700">
                Toplam: {getTotalPrice()} ₺
              </p>
            </div>

<<<<<<< HEAD
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Sipariş Detayları</h2>
                  <button onClick={clearCart} className="text-red-600 hover:text-red-700 font-medium">Sepeti Temizle</button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">{item.price}₺</p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"><i className="ri-subtract-line"></i></button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"><i className="ri-add-line"></i></button>
                        <button onClick={() => removeItem(item.id)} className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 ml-4"><i className="ri-delete-bin-line"></i></button>
                      </div>

                      <div className="text-right ml-4">
                        <span className="font-bold text-red-600">{(item.price * item.quantity).toFixed(0)}₺</span>
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
                  <div className="flex justify-between"><span>Ara Toplam</span><span>{getTotalPrice().toFixed(0)}₺</span></div>
                  <div className="flex justify-between"><span>Teslimat</span><span className="text-green-600">Ücretsiz</span></div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Toplam</span>
                      <span className="text-red-600">{getTotalPrice().toFixed(0)}₺</span>
                    </div>
                  </div>
                </div>

                {/* YENİ BUTON - form açıyor */}
                <button onClick={sendOrderToWhatsApp} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center mb-3">
                  <i className="ri-whatsapp-line mr-2" /> WhatsApp ile Sipariş Ver
                </button>

                <Link href="/menu" className="w-full block text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200">Alışverişe Devam Et</Link>
              </div>
=======
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Sipariş Detayları</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Masa No (isteğe bağlı)"
                  value={masa}
                  onChange={(e) => setMasa(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
                <input
                  type="text"
                  placeholder="Adres (isteğe bağlı)"
                  value={adres}
                  onChange={(e) => setAdres(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
                <input
                  type="text"
                  placeholder="Sipariş Notu (isteğe bağlı)"
                  value={not}
                  onChange={(e) => setNot(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
              <button
                onClick={() => sendOrderToWhatsApp(masa, adres, not)}
                className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium w-full sm:w-auto shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                💬 WhatsApp ile Sipariş Ver
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-lg font-medium w-full sm:w-auto transition-colors"
              >
                🧹 Sepeti Temizle
              </button>
>>>>>>> 1f5b1163 (İlk yükleme)
            </div>
          </>
        )}
      </div>

      {/* ----------  ADRES + TELEFON + ÖDEME FORMU  ---------- */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Siparişi Tamamla</h3>
            <label className="block text-sm font-medium text-gray-700">Adres (Detaylı)</label>
            <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border rounded-lg px-3 py-2" rows={3} placeholder="Mahalle, sokak, apartman, daire..." />
            <label className="block text-sm font-medium text-gray-700">Telefon</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2" placeholder="05XX XXX XX XX" />
            <label className="block text-sm font-medium text-gray-700">Ödeme Türü</label>
            <div className="flex gap-4">
              <label className="flex items-center"><input type="radio" name="payment" checked={form.payment === 'Nakit'} onChange={() => setForm({ ...form, payment: 'Nakit' })} className="mr-2" />Nakit</label>
              <label className="flex items-center"><input type="radio" name="payment" checked={form.payment === 'K.K.'} onChange={() => setForm({ ...form, payment: 'K.K.' })} className="mr-2" />Kredi Kartı</label>
            </div>
            <div className="flex gap-3">
              <button onClick={finalizeOrder} className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Siparişi WhatsApp&apos;a Gönder</button>
              <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
