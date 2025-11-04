'use client'; // Bu sayfada Link kullandığımız için 'use client' ekliyoruz

import Link from 'next/link';

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-900 text-white">
        <h1 className="text-8xl font-bold text-red-600">404</h1>
        
        {/* === DİL GÜNCELLEMESİ === */}
        <h2 className="text-3xl md:text-4xl font-semibold mt-6">
          Az oldal nem található
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-md">
          Sajnáljuk, a keresett oldal nem létezik vagy áthelyezésre került.
          Kérjük, ellenőrizze a címet, vagy térjen vissza a kezdőlapra.
        </p>

        {/* === EKLENEN BUTON === */}
        <Link 
          href="/"
          className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Vissza a Kezdőlapra
        </Link>
      </div>
    );
  }