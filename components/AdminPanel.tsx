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
    alert("Tartalom sikeresen frissítve ✅");
  };

  const handleReset = () => {
    if (window.confirm("Minden tartalom visszaáll az alapértelmezett értékekre. Biztos vagy benne?")) {
      resetContent();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛠️ Kezelőpanel (Admin Panel)
      </h1>

      {/* Genel Bilgiler */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Étterem Információk</h2>
        <label className="block mb-2 font-medium">Étterem Neve</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.restaurantName}
          onChange={(e) => setLocalContent({ ...localContent, restaurantName: e.target.value })}
        />

        <label className="block mb-2 font-medium">Leírás (Rólunk)</label>
        <textarea
          className="w-full border rounded p-2 mb-4"
          value={localContent.aboutText}
          onChange={(e) => setLocalContent({ ...localContent, aboutText: e.target.value })}
        />

        <label className="block mb-2 font-medium">Cím</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.address}
          onChange={(e) => setLocalContent({ ...localContent, address: e.target.value })}
        />

        <label className="block mb-2 font-medium">Telefonszám</label>
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          value={localContent.phone}
          onChange={(e) => setLocalContent({ ...localContent, phone: e.target.value })}
        />
      </div>

      {/* Menü Yönetimi */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Menü Kezelése</h2>
        <button
          onClick={() => {
            setShowAddMenu(!showAddMenu);
            setEditingMenuItem(null);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          {showAddMenu ? "Bezárás" : "Új Termék Hozzáadása"}
        </button>

        {showAddMenu && (
          <div className="border p-4 rounded mb-6 bg-gray-50">
            <h3 className="font-semibold mb-2">Új Menü Elem</h3>
            <input
              type="text"
              placeholder="Termék Neve"
              className="w-full border rounded p-2 mb-2"
              value={editingMenuItem?.name || ""}
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  name: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Ár"
              className="w-full border rounded p-2 mb-2"
              value={editingMenuItem?.price ?? ""}
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  price: Number(e.target.value),
                })
              }
            />
            <input
              type="text"
              placeholder="Kategória"
              className="w-full border rounded p-2 mb-2"
              value={editingMenuItem?.category || ""}
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  category: e.target.value as MenuItem["category"],
                })
              }
            />
            <input
              type="text"
              placeholder="Kép URL"
              className="w-full border rounded p-2 mb-2"
              value={editingMenuItem?.image || ""}
              onChange={(e) =>
                setEditingMenuItem({
                  ...(editingMenuItem || ({} as MenuItem)),
                  image: e.target.value,
                })
              }
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={() => {
                if (
                  editingMenuItem &&
                  editingMenuItem.name &&
                  editingMenuItem.price &&
                  editingMenuItem.category &&
                  editingMenuItem.image
                ) {
                  const updatedMenu = [
                    ...(localContent.allMenuItems || []),
                    {
                      ...editingMenuItem,
                      id:
                        editingMenuItem.id ||
                        `${editingMenuItem.category?.slice(0, 2).toLowerCase() || "m"}-${
                          Date.now()
                        }`,
                      rating: 5, // default rating, opsiyonel
                    },
                  ];
                  setLocalContent({ ...localContent, allMenuItems: updatedMenu });
                  setEditingMenuItem(null);
                  setShowAddMenu(false);
                } else {
                  alert("Kérjük, töltse ki az összes mezőt!");
                }
              }}
            >
              Mentés
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
              {/* === FİYAT DEĞİŞİKLİĞİ ₺ -> Ft === */}
              <span className="font-medium text-red-600">{item.price} Ft</span>
              {item.image && (
                <img
                  className="mt-2 max-h-24 object-contain rounded"
                  src={item.image}
                  alt={item.name}
                />
              )}
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
          Mentés
        </button>
        <button
          onClick={handleReset}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700"
        >
          Visszaállítás
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-500"
          >
            Bezárás
          </button>
        )}
      </div>
    </div>
  );
}