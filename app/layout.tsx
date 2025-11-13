// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Pacifico } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartProvider';
import Navbar from '../components/Navbar';
import ErrorBoundary from '../components/ErrorBoundary';
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
    url: 'https://karagozdoner.vercel.app',
    siteName: 'Karagöz Döner',
    images: [
      {
        url: 'https://raw.githubusercontent.com/hakkurgithub/images/main/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Karagöz Döner - Esztergom török étterem'
      }
    ],
    locale: 'hu_HU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karagöz Döner - Hagyományos Török Konyha',
    description: 'Fedezze fel a hagyományos török konyha egyedülálló ízeit a Karagöz Döner-nél Esztergomban.',
    images: [
      'https://raw.githubusercontent.com/hakkurgithub/images/main/hero.jpg'
    ]
  },
  icons: {
    icon: 'https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg',
    shortcut: 'https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg',
    apple: 'https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg',
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
          <ErrorBoundary>
            <CartProvider>
              <Navbar />
              <main>{children}</main>
            </CartProvider>
          </ErrorBoundary>
        </SessionProvider>
      </body>
    </html>
  );
}