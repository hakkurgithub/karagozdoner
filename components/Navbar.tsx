"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useContent } from "../hooks/useContent";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle, User, Settings } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { content } = useContent();
  const { getTotalItems } = useCart();
  const { data: session, status } = useSession();
  const [itemCount, setItemCount] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const count = getTotalItems();
    if (count !== itemCount) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
      setItemCount(count);
    }
  }, [getTotalItems, itemCount]);

  // !! ÖNEMLİ !! Bu kısım "content" den (Yönetim Panelinden) gelir.
  // Lütfen Yönetim Panelinden telefonu 36209341537 veya 06209341537 olarak güncelleyin.
  const phoneNumber = content.phone.replace(/[^0-9]/g, "");
  const whatsappMessage = encodeURIComponent("Helló, rendelni szeretnék!");

  return (
    <nav className="bg-red-700 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition"
        >
          {content.restaurantName} {/* <-- Bu, Yönetim Panelinden gelir */}
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <NavLink href="/" label="Kezdőlap" active={pathname === "/"} />
          <NavLink href="/menu" label="Menü" active={pathname === "/menu"} />
          <NavLink href="/about" label="Rólunk" active={pathname === "/about"} />
          <NavLink href="/contact" label="Elérhetőség" active={pathname === "/contact"} />

          <Link
            href="/cart"
            className={`relative bg-yellow-400 text-red-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition ${
              animate ? "scale-110 transition-transform" : ""
            }`}
          >
            🛒 Kosaram
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {status === "loading" ? (
            <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          ) : session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <User size={20} />
                <span className="text-sm">{session.user.name?.split(' ')[0]}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border py-2 z-50">
                  <div className="px-3 py-2 border-b">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-gray-600">{session.user.email}</p>
                  </div>
                  
                  {session.user.role === 'manager' ? (
                    <Link
                      href="/manager"
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={16} />
                      <span className="text-sm">Kezelőpanel</span>
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={16} />
                      <span className="text-sm">Fiókom</span>
                    </Link>
                  )}
                  
                  <Link
                    href="/api/auth/signout"
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 transition-colors text-red-600"
                  >
                    <span className="text-sm">Kijelentkezés</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              className="flex items-center space-x-2 px-4 py-2 bg-white text-red-700 rounded-lg font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <User size={18} />
              <span>Bejelentkezés</span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-red-800 text-white px-4 py-4 space-y-4 pb-20">
          <MobileLink href="/" label="Kezdőlap" setMenuOpen={setMenuOpen} />
          <MobileLink href="/menu" label="Menü" setMenuOpen={setMenuOpen} />
          <MobileLink href="/about" label="Rólunk" setMenuOpen={setMenuOpen} />
          <MobileLink href="/contact" label="Elérhetőség" setMenuOpen={setMenuOpen} />

          <Link
            href="/cart"
            onClick={() => setMenuOpen(false)}
            className={`relative bg-yellow-400 text-red-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition block text-center ${
              animate ? "scale-110 transition-transform" : ""
            }`}
          >
            🛒 Kosaram
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile User Menu */}
          {status === "loading" ? (
            <div className="w-full bg-white/20 rounded-lg p-3 animate-pulse text-center">
              Betöltés...
            </div>
          ) : session ? (
            <div className="space-y-2">
              <div className="bg-red-700 p-3 rounded-lg">
                <p className="font-medium">{session.user.name}</p>
                <p className="text-sm text-red-200">{session.user.email}</p>
              </div>
              
              {session.user.role === 'manager' ? (
                <Link
                  href="/manager"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 bg-white text-red-700 p-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Settings size={18} />
                  <span>Kezelőpanel</span>
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-2 bg-white text-red-700 p-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <User size={18} />
                  <span>Fiókom</span>
                </Link>
              )}
              
              <Link
                href="/api/auth/signout"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-500 transition-colors"
              >
                Kijelentkezés
              </Link>
            </div>
          ) : (
            <Link
              href="/api/auth/signin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center space-x-2 bg-white text-red-700 p-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <User size={18} />
              <span>Bejelentkezés</span>
            </Link>
          )}
        </div>
      )}

      {/* !! ÖNEMLİ !! Bu linkler Yönetim Panelindeki "Telefon" alanından beslenir */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center space-x-4 md:hidden z-50">
        <a
          href={`tel:${phoneNumber}`}
          className="bg-green-600 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-green-500 transition"
        >
          <Phone size={18} /> Hívás
        </a>

        <a
          href={`https://wa.me/${phoneNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-emerald-400 transition"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`hover:text-yellow-300 transition ${
        active ? "text-yellow-300 font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  setMenuOpen,
}: {
  href: string;
  label: string;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => setMenuOpen(false)}
      className="block hover:text-yellow-300 transition"
    >
      {label}
    </Link>
  );
}