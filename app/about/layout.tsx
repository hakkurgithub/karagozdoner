import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rólunk",
  description:
    "Ismerje meg a Karagöz Döner történetét! Autentikus török döner és kebab specialitásokat kínálunk Esztergom szívében, a Kossuth Lajos utca 30. alatt. Családi vállalkozásunk több mint egy évtizedes tapasztalattal várja vendégeit.",
  keywords: [
    "Karagöz Döner története",
    "török étterem Esztergom",
    "döner Esztergom",
    "kebab története",
    "családi vállalkozás",
    "autentikus török konyha",
  ],
  openGraph: {
    title: "Rólunk | Karagöz Döner",
    description:
      "Ismerje meg a Karagöz Döner történetét! Autentikus török döner és kebab specialitások Esztergom szívében.",
    url: "https://www.karagozdoner.com/about",
  },
  alternates: {
    canonical: "https://www.karagozdoner.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Rólunk - Karagöz Döner",
            description:
              "A Karagöz Döner története és értékei. Autentikus török döner és kebab Esztergomban.",
            url: "https://www.karagozdoner.com/about",
            mainEntity: {
              "@type": "Restaurant",
              name: "Karagöz Döner",
              description:
                "Autentikus török döner és kebab étterem Esztergom szívében",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kossuth Lajos utca 30",
                addressLocality: "Esztergom",
                postalCode: "2500",
                addressCountry: "HU",
              },
            },
          }),
        }}
      />
      {children}
    </>
  );
}
