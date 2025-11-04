// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Pacifico } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartProvider';
import Navbar from '../components/Navbar';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pacifico'
});

// === TÜM METADATA GÜNCELLENDİ (DİL, İSİM, KONUM, URL) ===
export const metadata: Metadata = {
  title: 'Karagöz Döner - Hagyományos Török Konyha',
  description: 'Fedezze fel a hagyományos török konyha egyedülálló ízeit a Karagöz Döner-nél Esztergomban. Adana kebap, pide, lahmacun és még sok más.',
  keywords: 'karagöz döner, török konyha, adana kebap, pide, lahmacun, esztergom étterem',
  robots: 'index, follow',
  openGraph: {
    title: 'Karagöz Döner - Hagyományos Török Konyha',
    description: 'Fedezze fel a hagyományos török konyha egyedülálló ízeit a Karagöz Döner-nél Esztergomban.',
    url: 'https://karagozdoner.vercel.app', // Site URL'si güncellendi
    siteName: 'Karagöz Döner', // İsim güncellendi
    images: [
      {
        // Resim arama sorgusu güncellendi
        url: 'https://readdy.ai/api/search-image?query=Turkish%20restaurant%20logo%20Karagoz%20Döner%20traditional%20cuisine%20branding&width=1200&height=630&seq=og&orientation=landscape',
        width: 1200,
        height: 630,
        alt: 'Karagöz Döner' // Alt metin güncellendi
      }
    ],
    locale: 'hu_HU', // Bölge kodu güncellendi
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karagöz Döner - Hagyományos Török Konyha',
    description: 'Fedezze fel a hagyományos török konyha egyedülálló ízeit a Karagöz Döner-nél Esztergomban.',
    images: [
      // Resim arama sorgusu güncellendi
      'https://readdy.ai/api/search-image?query=Turkish%20restaurant%20logo%20Karagoz%20Döner%20traditional%20cuisine%20branding&width=1200&height=630&seq=twitter&orientation=landscape'
    ]
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // === DİL GÜNCELLEMESİ (tr -> hu) ===
    <html lang="hu" className={`${inter.className} ${pacifico.variable}`}>
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}