"use client";

import React, { useState, useEffect } from "react";
import { useContent } from "../hooks/useContent";
import { MenuItem } from "../lib/menuData";

export interface AdminPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminPanel({ isOpen = true, onClose }: AdminPanelProps) {
  const { content, updateContent, resetContent } = useContent();
  const [localContent, setLocalContent] = useState(content);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const handleSave = () => {
    updateContent(localContent);
    alert("İçerik başarıyla güncellendi ✅");
  };

  const handleReset = () => {
    if (window.confirm("Tüm içerik varsayılan değerlere döndürülecek. Emin misiniz?")) {
      resetContent();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛠️ Yönetim Paneli (AdminPanel)
      </h1>

      {/* Genel Bilgiler */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Restoran Bilgileri</h2>
        <label className="block mb-2 font-medium">Restoran Adı</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.restaurantName}
          onChange={(e) => setLocalContent({ ...localContent, restaurantName: e.target.value })}
        />

        <label className="block mb-2 font-medium">Açıklama</label>
        <textarea
          className="w-full border rounded p-2 mb-4"
          value={localContent.aboutText}
          onChange={(e) => setLocalContent({ ...localContent, aboutText: e.target.value })}
        />

        <label className="block mb-2 font-medium">Adres</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.address}
          onChange={(e) => setLocalContent({ ...localContent, address: e.target.value })}
        />

        <label className="block mb-2 font-medium">Telefon</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.phone}
          onChange={(e) => setLocalContent({ ...localContent, phone: e.target.value })}
        />
      </div>

      {/* Menü Yönetimi */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Menü Yönetimi</h2>
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          {showAddMenu ? "Kapat" : "Yeni Ürün Ekle"}
        </button>

        {showAddMenu && (
          <div className="border p-4 rounded mb-6 bg-gray-50">
            <h3 className="font-semibold mb-2">Yeni Menü Ürünü</h3>
            <input
              type="text"
              placeholder="Ürün Adı"
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                setEditingMenuItem({ ...(editingMenuItem || ({} as MenuItem)), name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Fiyat"
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  price: Number(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Kategori"
              className="w-full border rounded p-2 mb-2"
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  category: e.target.value as MenuItem["category"],
                })
              }
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => {
                if (editingMenuItem) {
                  const updatedMenu = [
                    ...(localContent.allMenuItems || []),
                    editingMenuItem,
                  ];
                  setLocalContent({ ...localContent, allMenuItems: updatedMenu });
                  setEditingMenuItem(null);
                  setShowAddMenu(false);
                }
              }}
            >
              Kaydet
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {localContent.allMenuItems?.map((item: MenuItem, i: number) => (
            <div
              key={i}
              className="border rounded p-4 flex flex-col bg-gray-50 hover:bg-gray-100 transition"
            >
              <span className="font-semibold text-lg">{item.name}</span>
              <span className="text-sm text-gray-600">{item.category}</span>
              <span className="font-medium text-red-600">{item.price} ₺</span>
            </div>
          ))}
        </div>
      </div>

      {/* İşlem Butonları */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700"
        >
          Kaydet
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Sıfırla
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500"
          >
            Kapat
          </button>
        )}
      </div>
    </div>
  );
}
