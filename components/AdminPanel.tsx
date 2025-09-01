
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { adminConfig } from '../lib/admin';
import { useContent } from '../hooks/useContent';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('genel');
  const [editingMenuItem, setEditingMenuItem] = useState<any>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const { content, updateContent, resetContent } = useContent();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('borcan_admin_authenticated') === 'true';
      setIsAuthenticated(isAuth);
    }
  }, []);

  const handleLogin = () => {
    if (username === adminConfig.username && password === adminConfig.password) {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('borcan_admin_authenticated', 'true');
      }
    } else {
      alert('Hatalı kullanıcı adı veya şifre');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    onClose();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('borcan_admin_authenticated');
    }
  };

  const handleContentUpdate = (field: string, value: any) => {
    updateContent({ [field]: value });
  };

  const handleMenuItemUpdate = (updatedItem: any) => {
    const updatedMenuItems = content.allMenuItems?.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ) || [];
    updateContent({ allMenuItems: updatedMenuItems });
    setEditingMenuItem(null);
  };

  const handleAddMenuItem = (newItem: any) => {
    const newId = Date.now().toString();
    const menuItemWithId = { ...newItem, id: newId, rating: newItem.rating || 5 };
    const updatedMenuItems = [...(content.allMenuItems || []), menuItemWithId];
    updateContent({ allMenuItems: updatedMenuItems });
    setShowAddMenu(false);
  };

  const handleDeleteMenuItem = (id: string) => {
    if (confirm('Bu menü öğesini silmek istediğinizden emin misiniz?')) {
      const updatedMenuItems = content.allMenuItems?.filter(item => item.id !== id) || [];
      updateContent({ allMenuItems: updatedMenuItems });
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Admin Giriş</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Admin Panel - İçerik Yönetimi</h2>
          <div className="flex space-x-2">
            <button
              onClick={resetContent}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 whitespace-nowrap"
              title="Varsayılan ayarlara dön"
            >
              Sıfırla
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 whitespace-nowrap"
            >
              Çıkış
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('genel')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'genel' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                <i className="ri-settings-line mr-2"></i>
                Genel Ayarlar
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'menu' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                <i className="ri-restaurant-line mr-2"></i>
                Tüm Menü Yönetimi
              </button>
              <button
                onClick={() => setActiveTab('homepage-menu')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'homepage-menu' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                <i className="ri-home-line mr-2"></i>
                Ana Sayfa Menüleri
              </button>
              <button
                onClick={() => setActiveTab('siparis')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'siparis' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                <i className="ri-shopping-cart-line mr-2"></i>
                Sipariş Kanalları
              </button>
              <button
                onClick={() => setActiveTab('sosyal')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === 'sosyal' ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
                }`}
              >
                <i className="ri-share-line mr-2"></i>
                Sosyal Medya
              </button>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'genel' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Genel Ayarlar</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Restoran Adı</label>
                    <input
                      type="text"
                      value={content.restaurantName}
                      onChange={(e) => handleContentUpdate('restaurantName', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon</label>
                    <input
                      type="text"
                      value={content.phone}
                      onChange={(e) => handleContentUpdate('phone', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hero Başlık</label>
                  <input
                    type="text"
                    value={content.heroTitle}
                    onChange={(e) => handleContentUpdate('heroTitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hero Alt Başlık</label>
                  <textarea
                    value={content.heroSubtitle}
                    onChange={(e) => handleContentUpdate('heroSubtitle', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hakkımızda Metni</label>
                  <textarea
                    value={content.aboutText}
                    onChange={(e) => handleContentUpdate('aboutText', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Adres</label>
                  <textarea
                    value={content.address}
                    onChange={(e) => handleContentUpdate('address', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Deneyim Yılı</label>
                    <input
                      type="text"
                      value={content.aboutStats?.experience || ''}
                      onChange={(e) => handleContentUpdate('aboutStats', { ...content.aboutStats, experience: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Müşteri Sayısı</label>
                    <input
                      type="text"
                      value={content.aboutStats?.customers || ''}
                      onChange={(e) => handleContentUpdate('aboutStats', { ...content.aboutStats, customers: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Menü Çeşidi</label>
                    <input
                      type="text"
                      value={content.aboutStats?.menuCount || ''}
                      onChange={(e) => handleContentUpdate('aboutStats', { ...content.aboutStats, menuCount: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Şube Sayısı</label>
                    <input
                      type="text"
                      value={content.aboutStats?.branches || ''}
                      onChange={(e) => handleContentUpdate('aboutStats', { ...content.aboutStats, branches: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">Tüm Menü Yönetimi</h3>
                    <p className="text-sm text-gray-600 mt-1">Menü sayfasında görünen tüm ürünleri yönetin</p>
                  </div>
                  <button
                    onClick={() => setShowAddMenu(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Yeni Menü Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.allMenuItems?.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      {item.image && (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={300}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg mb-3" 
                        />
                      )}
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-red-600 font-bold mb-2">₺{item.price}</p>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">{item.category}</span>
                      <div className="flex items-center mt-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < (item.rating || 0) ? "fill" : "line"} text-yellow-400 text-sm`}
                          ></i>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">({item.rating || 0}/5)</span>
                      </div>
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => setEditingMenuItem(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 whitespace-nowrap"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteMenuItem(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 whitespace-nowrap"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'homepage-menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">Ana Sayfa Menüleri</h3>
                    <p className="text-sm text-gray-600 mt-1">Ana sayfada &quot;Popüler Lezzetler&quot; bölümünde görünen menüler (maksimum 4 adet)</p>
                  </div>
                  <button
                    onClick={() => setShowAddMenu(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Yeni Menü Ekle
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {content.menuItems?.slice(0, 4).map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                      {item.image && (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={300}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg mb-3" 
                        />
                      )}
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                      <p className="text-red-600 font-bold mb-2">₺{item.price}</p>
                      <span className="inline-block bg-gray-100 px-2 py-1 rounded text-sm">{item.category}</span>
                      <div className="flex space-x-2 mt-3">
                        <button
                          onClick={() => setEditingMenuItem(item)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 whitespace-nowrap"
                        >
                          Düzenle
                        </button>
                        <button
                          onClick={() => {
                            const updatedMenuItems = content.menuItems?.filter(menuItem => menuItem.id !== item.id) || [];
                            updateContent({ menuItems: updatedMenuItems });
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 whitespace-nowrap"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'siparis' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Sipariş Kanalları</h3>
                
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="checkbox"
                        checked={content.orderChannels?.yemeksepeti?.active}
                        onChange={(e) => handleContentUpdate('orderChannels', {
                          ...content.orderChannels,
                          yemeksepeti: { ...content.orderChannels?.yemeksepeti, active: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <label className="font-semibold">Yemeksepeti</label>
                    </div>
                    <input
                      type="url"
                      placeholder="Yemeksepeti URL'si"
                      value={content.orderChannels?.yemeksepeti?.url || ''}
                      onChange={(e) => handleContentUpdate('orderChannels', {
                        ...content.orderChannels,
                        yemeksepeti: { ...content.orderChannels?.yemeksepeti, url: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="checkbox"
                        checked={content.orderChannels?.getir?.active}
                        onChange={(e) => handleContentUpdate('orderChannels', {
                          ...content.orderChannels,
                          getir: { ...content.orderChannels?.getir, active: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <label className="font-semibold">Getir</label>
                    </div>
                    <input
                      type="url"
                      placeholder="Getir URL'si"
                      value={content.orderChannels?.getir?.url || ''}
                      onChange={(e) => handleContentUpdate('orderChannels', {
                        ...content.orderChannels,
                        getir: { ...content.orderChannels?.getir, url: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="checkbox"
                        checked={content.orderChannels?.whatsapp?.active}
                        onChange={(e) => handleContentUpdate('orderChannels', {
                          ...content.orderChannels,
                          whatsapp: { ...content.orderChannels?.whatsapp, active: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <label className="font-semibold">WhatsApp Sipariş</label>
                    </div>
                    <input
                      type="url"
                      placeholder="WhatsApp URL'si"
                      value={content.orderChannels?.whatsapp?.url || ''}
                      onChange={(e) => handleContentUpdate('orderChannels', {
                        ...content.orderChannels,
                        whatsapp: { ...content.orderChannels?.whatsapp, url: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="checkbox"
                        checked={content.orderChannels?.tgoyemek?.active}
                        onChange={(e) => handleContentUpdate('orderChannels', {
                          ...content.orderChannels,
                          tgoyemek: { ...content.orderChannels?.tgoyemek, active: e.target.checked }
                        })}
                        className="rounded"
                      />
                      <label className="font-semibold">TGOYemek</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Buton metni"
                      value={content.orderChannels?.tgoyemek?.text || ''}
                      onChange={(e) => handleContentUpdate('orderChannels', {
                        ...content.orderChannels,
                        tgoyemek: { ...content.orderChannels?.tgoyemek, text: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg mb-2"
                    />
                    <input
                      type="url"
                      placeholder="TGOYemek URL'si"
                      value={content.orderChannels?.tgoyemek?.url || ''}
                      onChange={(e) => handleContentUpdate('orderChannels', {
                        ...content.orderChannels,
                        tgoyemek: { ...content.orderChannels?.tgoyemek, url: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sosyal' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Sosyal Medya</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Facebook</label>
                    <input
                      type="url"
                      value={content.socialMedia?.facebook || ''}
                      onChange={(e) => handleContentUpdate('socialMedia', { ...content.socialMedia, facebook: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <input
                      type="url"
                      value={content.socialMedia?.instagram || ''}
                      onChange={(e) => handleContentUpdate('socialMedia', { ...content.socialMedia, instagram: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <input
                      type="url"
                      value={content.socialMedia?.twitter || ''}
                      onChange={(e) => handleContentUpdate('socialMedia', { ...content.socialMedia, twitter: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Edit Modal */}
      {(editingMenuItem || showAddMenu) && (
        <MenuEditModal
          item={editingMenuItem}
          onSave={editingMenuItem ? 
            (activeTab === 'homepage-menu' ? 
              (updatedItem: any) => {
                const updatedMenuItems = content.menuItems?.map(item => 
                  item.id === updatedItem.id ? updatedItem : item
                ) || [];
                updateContent({ menuItems: updatedMenuItems });
                setEditingMenuItem(null);
              } : 
              handleMenuItemUpdate
            ) : 
            (activeTab === 'homepage-menu' ? 
              (newItem: any) => {
                const newId = Date.now().toString();
                const menuItemWithId = { ...newItem, id: newId };
                const updatedMenuItems = [...(content.menuItems || []), menuItemWithId];
                updateContent({ menuItems: updatedMenuItems });
                setShowAddMenu(false);
              } : 
              handleAddMenuItem
            )
          }
          onCancel={() => {
            setEditingMenuItem(null);
            setShowAddMenu(false);
          }}
        />
      )}
    </div>
  );
}

// Menu Edit Modal Component
function MenuEditModal({ item, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    category: item?.category || '',
    image: item?.image || '',
    rating: item?.rating || 5
  });

  const categories = [
    "Kebaplar & Izgaralar",
    "Pide & Lahmacun", 
    "Döner",
    "Dürüm",
    "Çorbalar",
    "Yan Ürünler",
    "Tatlılar",
    "İçecekler"
  ];

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      alert('Lütfen tüm zorunlu alanları doldurun');
      return;
    }
    onSave({ ...item, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">
          {item ? 'Menü Düzenle' : 'Yeni Menü Ekle'}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ürün Adı *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Açıklama *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg h-20 resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Fiyat (₺) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Kategori *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg pr-8"
            >
              <option value="">Kategori Seçin</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Puan (1-5)</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-lg pr-8"
            >
              <option value={1}>1 Yıldız</option>
              <option value={2}>2 Yıldız</option>
              <option value={3}>3 Yıldız</option>
              <option value={4}>4 Yıldız</option>
              <option value={5}>5 Yıldız</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Resim URL&apos;si (Opsiyonel)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="https://..."
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 whitespace-nowrap"
          >
            Kaydet
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 whitespace-nowrap"
          >
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}
