'use client';

import { useState, useEffect } from "react";
import { useCart } from "../../components/CartProvider";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    category: string | null;
    image: string | null;
    isActive: number;
}

export default function MenuPage() {
    const { addItem, items } = useCart();
    const [activeCategory, setActiveCategory] = useState("all");
    const [isClient, setIsClient] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsClient(true);
        
        // Fetch products from API
        fetch('/api/products')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProducts(data.data);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading products:', error);
                setLoading(false);
            });
    }, []);

    const categories = [
        "all",
        "Kebaplar & Izgaralar",
        "Pide & Lahmacun",
        "Döner",
        "Dürüm",
        "Çorbalar",
        "Yan Ürünler",
        "Tatlılar",
        "İçecekler"
    ];

    const filteredItems = products.filter((item) =>
        activeCategory === "all" ? true : item.category === activeCategory
    );

    const handleAddToCart = (item: Product) => {
        addItem({
            id: String(item.id),
            name: item.name,
            price: item.price / 100, // Database'de kuruş cinsinden
        });
    };

    if (!isClient || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-2xl text-gray-600">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
                    Menü
                </h1>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === category
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                            {category === "all" ? "Tümü" : category}
                        </button>
                    ))}
                </div>

                {/* Menu Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item) => {
                        // ✅ Sepette bu ürünün olup olmadığını kontrol et
                        const cartItem = items.find(cartItem => cartItem.id === String(item.id));
                        
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={item.image || '/images/placeholder.jpg'}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                    <p className="text-gray-600 text-sm flex-1">{item.description}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-2xl font-bold text-red-600">
                                            {(item.price / 100).toFixed(2)}₺
                                        </span>
                                        <div className="relative">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                            >
                                                <i className="ri-shopping-cart-fill mr-2"></i>Ekle
                                            </button>
                                            {cartItem && (
                                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                    {cartItem.quantity}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}