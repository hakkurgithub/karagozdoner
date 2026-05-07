import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galéria",
  description:
    "Tekintse meg a Karagöz Döner galériáját! Frissen készült ételeink, éttermünk hangulatos környezete és eseményeink képei. Autentikus török döner és kebab Esztergomban.",
  keywords: [
    "Karagöz Döner galéria",
    "török étterem képek",
    "döner képek",
    "kebab galéria",
    "Esztergom étterem",
    "éttermi fotók",
  ],
  openGraph: {
    title: "Galéria | Karagöz Döner",
    description:
      "Tekintse meg a Karagöz Döner galériáját! Frissen készült ételeink és éttermünk képei.",
    url: "https://www.karagozdoner.com/galeria",
  },
  alternates: {
    canonical: "https://www.karagozdoner.com/galeria",
  },
};

const galleryImages = [
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-hero.jpg",
    alt: "Karagöz Döner étterem belső tere",
    caption: "Éttermünk hangulatos környezete",
  },
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg",
    alt: "Frissen készült döner tál",
    caption: "Hagyományos döner tál friss zöldségekkel",
  },
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg",
    alt: "Döner készítés közben",
    caption: "Mesterien készült döner specialitásaink",
  },
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpg",
    alt: "Gyros tál választék",
    caption: "Válogatott gyros táljaink",
  },
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-kebap.jpg",
    alt: "Adana kebap grillezve",
    caption: "Fűszeres Adana kebap grillről",
  },
  {
    src: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender-kebab.jpg",
    alt: "Iskender kebab joghurtos öntettel",
    caption: "Klasszikus Iskender kebab",
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Galéria</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Pillantson be hozzánk! Ízelítő éttermünk hangulatából és ínycsiklandó ételeinkből.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-700 font-medium text-center">
                    {img.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Éttermünk Hangulata
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
            A Karagöz Döner nem csupán egy étterem - egy hely, ahol a török
            vendégszeretet és a magyar barátságosság találkozik. Látogasson el
            hozzánk, és élje át Ön is az élményt!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Frissen Sütött Piták</h3>
              <p className="text-gray-600">
                Minden nap frissen készítjük pitáinkat, hogy a legpuhább és
                legízletesebb alapot biztosítsuk dönerjeinkhez és gyrosainkhoz.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Török Díszítés</h3>
              <p className="text-gray-600">
                Éttermünk dekorációja tiszteletét fejezi ki a török kultúrának,
                miközben otthonos és modern környezetet teremt vendégeinknek.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Nyitott Konyha</h3>
              <p className="text-gray-600">
                Vendégeink láthatják, ahogy szakácsaink készítik ételeiket,
                garantálva a teljes átláthatóságot és bizalmat.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Családi Barátságos</h3>
              <p className="text-gray-600">
                Gyermekbarát környezet, kis asztalokkal és családoknak kialakított
                ülőhelyekkel várjuk a nagyobb társaságokat is.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
