import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatvédelmi Irányelvek",
  description:
    "Tájékoztató a Karagöz Döner adatkezelési gyakorlatáról. Ismerje meg, hogyan védjük személyes adatait, milyen sütiket használunk és milyen jogai vannak az adatvédelmi szabályozás szerint.",
  keywords: [
    "adatvédelem",
    "adatvédelmi irányelvek",
    "GDPR",
    "cookie politika",
    "sütik",
    "személyes adatok védelme",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.karagozdoner.com/adatvedelem",
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Adatvédelmi Irányelvek
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Tájékoztató a Karagöz Döner adatkezelési gyakorlatáról és az Ön
            jogairól.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Bevezetés</h2>
              <p className="text-gray-700 leading-relaxed">
                A Karagöz Döner (székhely: 2500 Esztergom, Kossuth Lajos utca
                30., adószám: [adószám], a továbbiakban: „Adatkezelő”)
                kiemelten fontosnak tartja személyes adatai védelmét. Jelen
                Adatvédelmi Irányelvek tájékoztatást nyújtanak arról, hogy
                milyen adatokat gyűjtünk, hogyan használjuk fel azokat, és
                milyen jogai vannak Önnek az Európai Unió Általános
                Adatvédelmi Rendelete (GDPR) és a magyar jogszabályok
                alapján.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                2. Milyen adatokat gyűjtünk?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Weboldalunk használata során az alábbi típusú adatokat
                gyűjthetjük:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Technikai adatok:</strong> IP-cím, böngésző típusa,
                  operációs rendszer, látogatás időpontja és időtartama.
                </li>
                <li>
                  <strong>Kapcsolatfelvételi adatok:</strong> Ha üzenetet küld
                  nekünk a weboldalon keresztül, az Ön által megadott név,
                  e-mail cím és üzenet tartalma.
                </li>
                <li>
                  <strong>Rendelési adatok:</strong> Ha online rendelést
                  ad le, a rendelés részletei, szállítási cím és
                  fizetési információk.
                </li>
                <li>
                  <strong>Cookie-k és hasonló technológiák:</strong> Lásd a
                  Cookie Szabályzat részt.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                3. Hogyan használjuk fel az adatait?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Az Ön személyes adatait az alábbi célokra használjuk fel:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Rendelések feldolgozása és teljesítése</li>
                <li>Kapcsolattartás és ügyfélszolgálat</li>
                <li>Weboldalunk működtetése és fejlesztése</li>
                <li>Statisztikai elemzések és teljesítménymérések</li>
                <li>Jogszabályi kötelezettségek teljesítése</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Cookie Szabályzat</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Weboldalunk sütiket (cookie-kat) és hasonló technológiákat
                használ a felhasználói élmény javítása, a weboldal
                működésének biztosítása és statisztikai célokra.
              </p>
              <h3 className="text-xl font-semibold mb-2">
                4.1. Milyen sütiket használunk?
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Szükséges sütik:</strong> Ezek elengedhetetlenek a
                  weboldal működéséhez, például a kosár funkció és a
                  bejelentkezés működtetéséhez.
                </li>
                <li>
                  <strong>Preferencia sütik:</strong> Ezek lehetővé teszik,
                  hogy a weboldal emlékezzen az Ön beállításaira (pl.
                  nyelvválasztás).
                </li>
                <li>
                  <strong>Statisztikai sütik:</strong> Segítenek megérteni,
                  hogyan használják a látogatók a weboldalt (pl. Google
                  Analytics).
                </li>
                <li>
                  <strong>Marketing sütik:</strong> Ezeket arra használjuk,
                  hogy releváns hirdetéseket jelenítsünk meg (pl. Google
                  AdSense).
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                A sütiket bármikor kezelheti böngészője beállításaiban. A sütik
                letiltása azonban befolyásolhatja a weboldal egyes funkcióinak
                működését.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                5. Adattovábbítás és harmadik felek
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Az Ön személyes adatait kizárólag az alábbi esetekben
                továbbítjuk harmadik feleknek:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                <li>
                  <strong>Google Analytics:</strong> Weboldalunk látogatottságának
                  elemzésére (IP-cím anonimizálással).
                </li>
                <li>
                  <strong>Google AdSense:</strong> Hirdetések megjelenítésére a
                  weboldalon.
                </li>
                <li>
                  <strong>Szállítási partnerek:</strong> Rendelések kiszállítása
                  céljából (szükség esetén).
                </li>
                <li>
                  <strong>Jogszabályi kötelezettség:</strong> Hatósági megkeresés
                  esetén a vonatkozó jogszabályoknak megfelelően.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                6. Az Ön jogai
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Az GDPR alapján az alábbi jogok illetik meg:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Hozzáférési jog:</strong> Tájékoztatást kérhet arról,
                  milyen adatait kezeljük.
                </li>
                <li>
                  <strong>Helyesbítéshez való jog:</strong> Kérheti adatai
                  módosítását.
                </li>
                <li>
                  <strong>Törléshez való jog („elfeledtetéshez való jog”):</strong>{" "}
                  Kérheti adatai törlését.
                </li>
                <li>
                  <strong>Adatkezelés korlátozásához való jog:</strong> Bizonyos
                  esetekben korlátozhatja az adatkezelést.
                </li>
                <li>
                  <strong>Adathordozhatósághoz való jog:</strong> Kérheti adatai
                  géppel olvasható formátumban történő átadását.
                </li>
                <li>
                  <strong>Tiltakozási jog:</strong> Tiltakozhat adatai kezelése
                  ellen.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                7. Kapcsolatfelvétel
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ha bármilyen kérdése van az adatvédelemmel kapcsolatban, kérjük,
                vegye fel velünk a kapcsolatot az alábbi elérhetőségeken:
              </p>
              <ul className="list-none text-gray-700 space-y-2 mt-4">
                <li>
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:info@karagozdoner.com"
                    className="text-red-600 hover:underline"
                  >
                    info@karagozdoner.com
                  </a>
                </li>
                <li>
                  <strong>Telefon:</strong>{" "}
                  <a
                    href="tel:+36209341537"
                    className="text-red-600 hover:underline"
                  >
                    +36 20 934 1537
                  </a>
                </li>
                <li>
                  <strong>Postai cím:</strong> 2500 Esztergom, Kossuth Lajos
                  utca 30.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                8. Az irányelvek módosítása
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Fenntartjuk a jogot, hogy jelen Adatvédelmi Irányelveket
                bármikor módosítsuk. A módosításokról a weboldalon
                közzétett tájékoztatóval értesítjük a látogatókat. Az
                irányelvek legutóbbi frissítésének dátuma: 2025. május 1.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
