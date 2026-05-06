import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Karagöz Döner | Autentikus Török Döner és Kebap Esztergomban",
    template: "%s | Karagöz Döner",
  },
  description:
    "Karagöz Döner - Autentikus török döner, kebab és gyros specialitások Esztergom szívében. Friss alapanyagok, hagyományos receptek, gyors kiszolgálás. Rendeljen online vagy látogasson el hozzánk a Kossuth Lajos utca 30. alá.",
  keywords: [
    "döner",
    "kebab",
    "gyros",
    "török étterem",
    "Esztergom",
    "Karagöz Döner",
    "gyros tál",
    "Adana kebap",
    "török étel",
    "online rendelés",
    "házhoz szállítás",
    "elvitel",
    "gyorsétterem",
    "grill",
  ],
  authors: [{ name: "Karagöz Döner" }],
  creator: "Karagöz Döner",
  publisher: "Karagöz Döner",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "hu_HU",
    url: "https://www.karagozdoner.com",
    siteName: "Karagöz Döner",
    title: "Karagöz Döner | Autentikus Török Döner és Kebap Esztergomban",
    description:
      "Autentikus török döner, kebab és gyros specialitások Esztergom szívében. Friss alapanyagok, hagyományos receptek, gyors kiszolgálás.",
    images: [
      {
        url: "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Karagöz Döner Étterem Esztergomban",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karagöz Döner | Autentikus Török Döner és Kebap Esztergomban",
    description:
      "Autentikus török döner, kebab és gyros specialitások Esztergom szívében. Friss alapanyagok, hagyományos receptek.",
    images: [
      "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-hero.jpg",
    ],
  },
  alternates: {
    canonical: "https://www.karagozdoner.com",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Karagöz Döner",
  image:
    "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-hero.jpg",
  "@id": "https://www.karagozdoner.com",
  url: "https://www.karagozdoner.com",
  telephone: "+36-20-934-1537",
  email: "info@karagozdoner.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kossuth Lajos utca 30",
    addressLocality: "Esztergom",
    postalCode: "2500",
    addressCountry: "HU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.7934,
    longitude: 18.7419,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "11:00",
      closes: "23:00",
    },
  ],
  servesCuisine: "Turkish",
  menu: "https://www.karagozdoner.com/menu",
  acceptsReservations: "True",
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "HUF",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "156",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
