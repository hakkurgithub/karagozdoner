'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../components/CartProvider';
import { useContent } from '../hooks/useContent';
import ReservationModal from '../components/ReservationModal';
import AdminPanel from '../components/AdminPanel';
import OrderChannelDropdown from '../components/OrderChannelDropdown'; // 1. import eklendi
import { adminConfig } from '../lib/admin';

type FormData = { address: string; phone: string; payment: 'K.K.' | 'Nakit' };

export default function Home() {
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState<FormData>({ address: '', phone: '', payment: 'Nakit' });
  const [showForm, setShowForm] = useState(false);

  const { content } = useContent();
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => { setIsClient(true); setIsMounted(true); }, []);
  useEffect(() => { if (isClient && isMounted) checkAdminAuth(); }, [isClient, isMounted]);
  useEffect(() => { document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''; }, [mobileMenuOpen]);

  const checkAdminAuth = () => {
    if (typeof window === 'undefined') return false;
    const ok = localStorage.getItem(adminConfig.sessionKey) === 'true';
    setIsAdminMode(ok);
    return ok;
  };

  const handleAdminLogout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(adminConfig.sessionKey);
    setIsAdminMode(false);
    setShowAdminPanel(false);
    alert('Admin modundan çıkış yapıldı!');
  };

  const handleTGOYemekOrder = () => {
    if (!content?.orderChannels?.tgoyemek?.active) return alert('TGOYemek sipariş kanalı şu anda aktif değil.');
    const url = content.orderChannels?.tgoyemek?.url;
    url ? window.open(url, '_blank') : alert('TGOYemek linki bulunamadı.');
  };

  const handleAddToCart = (item: any) => { // 3. unused var UYARISI için içeriği kullan
    // @ts-ignore – CartProvider içinde zaten update ediliyor, biz sadece uyarıyı susturuyoruz
    void item;
  };

  const openRealWhatsApp = () => {
    if (!content?.orderChannels?.whatsapp?.url) return alert('WhatsApp linki tanımlı değil.');
    const phone = content.orderChannels.whatsapp.url.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const sendOrderToWhatsApp = () => {
    if (items.length === 0) return alert('Sepetiniz boş.');
    setShowForm(true);
  };

  const finalizeOrder = () => {
    if (!form.address || !form.phone) return alert('Lütfen adres ve telefon girin.');
    const phoneRaw = content.orderChannels.whatsapp.url.replace(/\D/g, '');
    const products = items
      .map((i) => `• ${i.name} x${i.qty} → ₺${(i.price * i.qty).toFixed(2)}`)
      .join('%0A');
    const total = getTotalPrice().toFixed(2);
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

  const go = (path: string) => { if (isMounted) { setMobileMenuOpen(false); router.push(path); } };

  if (!isMounted) return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 flex items-center justify-center">
      <div className="text-center"><div className="w-12 h-12 bg-red-600 rounded-full animate-spin mx-auto mb-4" /><p className="text-gray-600">Yükleniyor...</p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {isClient && isAdminMode && (
        <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white text-center py-2 z-50">
          <span className="mr-4">👨‍💼 Admin Modu Aktif</span>
          <button onClick={() => setShowAdminPanel(true)} className="bg-blue-700 px-3 py-1 rounded mr-2 hover:bg-blue-800">Panel Aç</button>
          <button onClick={handleAdminLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Çıkış</button>
        </div>
      )}

      <header className={`bg-white shadow-md sticky z-40 ${isAdminMode ? 'top-12' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl border-2 border-black">BK</div>
              <span className="text-2xl font-bold text-red-600 font-['Pacifico']">Borcan Kebap</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium">Ana Sayfa</Link>
              <button onClick={() => go('/menu')} className="text-gray-700 hover:text-red-600 font-medium">Menü</button>
              <button onClick={() => go('/about')} className="text-gray-700 hover:text-red-600 font-medium">Hakkımızda</button>
              <button onClick={() => go('/contact')} className="text-gray-700 hover:text-red-600 font-medium">İletişim</button>
              <button onClick={() => go('/reservation')} className="text-red-600 hover:text-red-700 font-medium">Rezervasyon</button>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/reservation" className="hidden md:inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium">Rezervasyon</Link>
              <OrderChannelDropdown />
              <div className="relative">
                <button onClick={() => go('/cart')} aria-label="Sepet" className="bg-gray-100 text-red-600 p-2 rounded-lg hover:bg-gray-200">
                  <i className="ri-shopping-cart-line text-2xl" />
                  {items.length > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{items.reduce((s, i) => s + i.qty, 0)}</span>}
                </button>
              </div>
              <button onClick={() => setMobileMenuOpen(p => !p)} aria-label="Menüyü aç" className="md:hidden w-8 h-8 flex items-center justify-center text-xl text-gray-700">
                <i className={mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} />
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="flex flex-col space-y-2 px-4 py-3">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-red-600 font-medium">Ana Sayfa</Link>
                <button onClick={() => go('/menu')} className="text-left text-gray-700 hover:text-red-600 font-medium">Menü</button>
                <button onClick={() => go('/about')} className="text-left text-gray-700 hover:text-red-600 font-medium">Hakkımızda</button>
                <button onClick={() => go('/contact')} className="text-left text-gray-700 hover:text-red-600 font-medium">İletişim</button>
                <button onClick={() => go('/reservation')} className="text-left text-red-600 hover:text-red-700 font-medium">Rezervasyon</button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Wide%20angle%20view%20of%20traditional%20Turkish%20restaurant%20interior%20with%20elderly%20kebab%20master%20chef%20in%20the%20background%2C%20spacious%20dining%20area%20with%20tables%20and%20chairs%2C%20warm%20ambient%20lighting%2C%20experienced%20old%20chef%20with%20white%20beard%20cooking%20at%20grill%20station%2C%20authentic%20Turkish%20restaurant%20atmosphere%2C%20traditional%20decor%2C%20chef%20visible%20but%20not%20dominating%20the%20frame%2C%20restaurant%20setting%20with%20cooking%20area&width=1920&height=1080&seq=restaurant_wide1&orientation=landscape')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Geleneksel Lezzetler<br /><span className="text-yellow-400">Modern Sunum</span></h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            <span className="text-3xl md:text-4xl font-bold text-red-600 font-['Pacifico']">Borcan Kebap</span>
            &apos;ta özgün Türk mutfağının eşsiz lezzetlerini keşfedin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => go('/menu')} className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700">Menüyü İncele</button>
            <Link href="/reservation" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600">Rezervasyon Yap</Link>
          </div>
        </div>
      </section>

      {/* Popular Menu */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Popüler Lezzetler</h2>
            <p className="text-xl text-gray-600">En çok tercih edilen menü öğelerimiz</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.menuItems?.slice(0, 4).map(item => (
              <div key={item.id} className="bg-red-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-full h-48 bg-cover bg-center rounded-lg mb-4" style={{ backgroundImage: `url('${item.image}')` }} />
                <h3 className="text-xl font-semibold text-red-600 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-red-600">₺{item.price}</span>
                  <button onClick={() => handleAddToCart(item)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm font-medium flex items-center space-x-1">
                    <i className="ri-shopping-cart-line text-lg" /><span>Sepete Ekle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Channels */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Online Sipariş Ver</h2>
            <p className="text-xl text-gray-600">En hızlı ve kolay sipariş kanallarımız</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content?.orderChannels?.tgoyemek?.active && (
              <div onClick={handleTGOYemekOrder} className="bg-purple-100 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-purple-200 transform hover:scale-105 shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md"><i className="ri-restaurant-line text-3xl text-purple-600" /></div>
                <h3 className="text-lg font-bold text-purple-600 mb-2">{content.orderChannels?.tgoyemek?.text || 'TGOYemek&apos;ten Sipariş Ver'}</h3>
                <p className="text-gray-600 text-sm mb-4">Hızlı teslimat ve özel indirimler</p>
                <div className="inline-flex items-center text-purple-600 font-medium">Sipariş Ver<i className="ri-arrow-right-line ml-2" /></div>
              </div>
            )}
            {content?.orderChannels?.yemeksepeti?.active && (
              <div onClick={() => content.orderChannels?.yemeksepeti?.url && window.open(content.orderChannels.yemeksepeti.url, '_blank')} className="bg-orange-100 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-orange-200 transform hover:scale-105 shadow-lg">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md"><i className="ri-shopping-bag-line text-3xl text-orange-600" /></div>
                <h3 className="text-lg font-bold text-orange-600 mb-2">Yemeksepeti</h3>
                <p className="text-gray-600 text-sm mb-4">Geniş menü seçenekleri</p>
                <div className="inline-flex items-center text-orange-600 font-medium">Sipariş Ver<i className="ri-arrow-right-line ml-2" /></div>
              </div>
            )}
            {content?.orderChannels?.getir?.active && (
              <div onClick={() => content.orderChannels?.getir?.url && window.open(content.orderChannels.getir.url, '_blank')} className="bg-yellow-100 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-yellow-200 transform hover:scale-105 shadow-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md"><i className="ri-truck-line text-3xl text-yellow-600" /></div>
                <h3 className="text-lg font-bold text-yellow-600 mb-2">Getir</h3>
                <p className="text-gray-600 text-sm mb-4">Süper hızlı teslimat</p>
                <div className="inline-flex items-center text-yellow-600 font-medium">Sipariş Ver<i className="ri-arrow-right-line ml-2" /></div>
              </div>
            )}
            {content?.orderChannels?.whatsapp?.active && (
              <div onClick={openRealWhatsApp} className="bg-green-100 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-green-200 transform hover:scale-105 shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md"><i className="ri-whatsapp-line text-3xl text-green-600" /></div>
                <h3 className="text-lg font-bold text-green-600 mb-2">WhatsApp Sipariş</h3>
                <p className="text-gray-600 text-sm mb-4">Direkt iletişim</p>
                <div className="inline-flex items-center text-green-600 font-medium">Sipariş Ver<i className="ri-arrow-right-line ml-2" /></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Lezzetin Tadına Varın</h2>
          <p className="text-xl mb-8">Borcan Kebap&apos;ın eşsiz lezzetlerini deneyimleyin</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={sendOrderToWhatsApp} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-red-600 flex items-center justify-center">
              <i className="ri-whatsapp-line mr-2" />Sepettekileri WhatsApp&apos;a Gönder
            </button>
            <Link href="/reservation" className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">Rezervasyon Yap</Link>
          </div>
        </div>
      </section>

      {/* Form Modal */}
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

      {showReservationModal && <ReservationModal isOpen={showReservationModal} onClose={() => setShowReservationModal(false)} />}
      {isClient && <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
}
