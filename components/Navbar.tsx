"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Kezdőlap", path: "/" },
    { name: "Menü", path: "/menu" },
    { name: "Rólunk", path: "/about" },
    { name: "Elérhetőség", path: "/contact" },
  ];

  return (
    <nav className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold font-serif tracking-wider hover:text-red-100 transition">
              Karagöz Döner
            </Link>
          </div>

          {/* Desktop Menü */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "bg-red-800 text-white"
                      : "text-red-100 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Sağ Taraf: Sepet */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="relative p-2 bg-yellow-600 rounded-full hover:bg-yellow-500 transition-colors text-white group"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-red-700 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-red-700">
                  {totalItems}
                </span>
              )}
              <span className="ml-2 font-medium hidden group-hover:inline-block">Kosaram</span>
            </Link>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-red-100 hover:text-white hover:bg-red-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Açılır Menü */}
      {isOpen && (
        <div className="md:hidden bg-red-800 pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? "bg-red-900 text-white"
                    : "text-red-100 hover:bg-red-600 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-yellow-300 hover:bg-red-600"
            >
              Kosaram ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
