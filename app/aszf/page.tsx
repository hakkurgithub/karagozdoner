import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  description:
    "A Karagöz Döner általános szerződési feltételei. Ismerje meg rendelési, szállítási és fizetési feltételeinket, valamint panaszkezelési eljárásunkat.",
  keywords: [
    "ászf",
    "szerződési feltételek",
    "rendelési feltételek",
    "szállítási feltételek",
    "fizetési feltételek",
    "panaszkezelés",
  ],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.karagozdoner.com/aszf",
  },
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Általános Szerződési Feltételek
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Kérjük, rendelés előtt figyelmesen olvassa el általános
            szerződési feltételeinket.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">1. Általános rendelkezések</h2>
              <p className="text-gray-700 leading-relaxed">
                Jelen Általános Szerződési Feltételek (a továbbiakban: „ÁSZF”)
                a Karagöz Döner (székhely: 2500 Esztergom, Kossuth Lajos utca
                30., telefon: +36 20 934 1537, e-mail: info@karagozdoner.com;
                a továbbiakban: „Szolgáltató”) és a weboldalát
                használó természetes személyek (a továbbiakban: „Vásárló”)
                közötti jogviszonyt szabályozzák.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">2. Szolgáltatások</h2>
              <p className="text-gray-700 leading-relaxed">
                A Szolgáltató a weboldalon feltüntetett ételek és italok
                értékesítését végzi. A szolgáltatások körébe tartozik:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-4">
                <li>Helyben fogyasztás az étteremben</li>
                <li>Elviteli rendelések</li>
                <li>Házhoz szállítás (Esztergom területén)</li>
                <li>Asztalfoglalás</li>
                <li>Rendezvények, catering szolgáltatás</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">3. Rendelés menete</h2>
              <p className="text-gray-700 leading-relaxed">
                A Vásárló a weboldalon keresztül vagy telefonon adhat le
                rendelést. A rendelés leadásával a Vásárló ajánlatot tesz a
                kiválasztott termékek megvásárlására. A Szolgáltató a rendelést
                telefonon vagy e-mailben visszaigazolja, amely a szerződés
                létrejöttét jelenti.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Rendelést leadni a nyitvatartási időben lehet: hétfőtől
                vasárnapig, 11:00 és 23:00 között. A rendelések feldolgozása a
                beérkezés sorrendjében történik.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">4. Árak és fizetés</h2>
              <p className="text-gray-700 leading-relaxed">
                Az ételek árai forintban (HUF) értendők, és az áfát tartalmazzák.
                A feltüntetett árak tájékoztató jellegűek, fenntartjuk a jogot az
                árváltoztatásra. A tényleges fizetendő összeget a rendelés
                visszaigazolásában közöljük.
              </p>
              <h3 className="text-xl font-semibold mb-2 mt-4">Fizetési módok:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Készpénz (helyszínen)</li>
                <li>Bankkártya (helyszínen)</li>
                <li>Utánvét (házhoz szállítás esetén)</li>
                <li>Banki átutalás (előre egyeztetett esetekben)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">5. Szállítási feltételek</h2>
              <p className="text-gray-700 leading-relaxed">
                A házhoz szállítás kizárólag Esztergom város területén belül
                elérhető. A szállítási idő 30-60 perc, ami függhet a
                rendelési mennyiségtől és az aktuális forgalomtól. A
                szállítási díjat a rendelés leadásakor feltüntetjük.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                A szállítási cím pontos megadása a Vásárló felelőssége. Ha a
                futár a megadott címen nem találja a Vásárlót, a rendelést
                sikertelen kézbesítésnek minősítjük, és a termék árát nem
                térítjük vissza.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">6. Lemondás és módosítás</h2>
              <p className="text-gray-700 leading-relaxed">
                A Vásárló a rendelését a visszaigazolástól számított 15 percen
                belül díjmentesen lemondhatja vagy módosíthatja telefonon. Ezután
                a lemondásra vagy módosításra csak abban az esetben van
                lehetőség, ha az étel elkészítése még nem kezdődött el.
                Catering és rendezvényszolgáltatás esetén a lemondási
                feltételek külön megállapodás szerint alakulnak.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">7. Minőségi panaszok kezelése</h2>
              <p className="text-gray-700 leading-relaxed">
                Ha a megrendelt étel minőségével vagy mennyiségével kapcsolatban
                panasza van, kérjük, azt haladéktalanul jelezze személyesen
                az étteremben, vagy telefonon a +36 20 934 1537 számon.
                Jogos panasz esetén az étel árát visszatérítjük, vagy
                kicseréljük az ételt. A panaszt a bejelentéstől számított 30
                napon belül kivizsgáljuk és válaszolunk rá.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">8. Adatvédelem</h2>
              <p className="text-gray-700 leading-relaxed">
                A Szolgáltató a Vásárló személyes adatait az Adatvédelmi
                Irányelvekben foglaltak szerint kezeli. Az adatkezelésről
                bővebb információt a{" "}
                <a
                  href="/adatvedelem"
                  className="text-red-600 hover:underline"
                >
                  Adatvédelmi Irányelvek
                </a>{" "}
                oldalon talál.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">9. Felelősség korlátozása</h2>
              <p className="text-gray-700 leading-relaxed">
                A Szolgáltató nem vállal felelősséget az olyan károkért,
                amelyek a Vásárló által hibásan megadott adatokból
                (pl. szállítási cím, telefonszám) erednek. A Szolgáltató
                nem felelős azon károkért sem, amelyek vis maior eseményekből
                (pl. természeti katasztrófák, közlekedési akadályok) erednek.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">10. Jogviták rendezése</h2>
              <p className="text-gray-700 leading-relaxed">
                Jelen ÁSZF-re a magyar jogszabályok az irányadók. A felek
                elsődlegesen békés úton törekszenek a jogviták rendezésére.
                Ha a felek között felmerült vitás kérdés békés úton nem
                rendezhető, a Vásárló a lakóhelye szerint illetékes
                békéltető testülethez fordulhat, vagy polgári peres
                eljárást kezdeményezhet.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Békéltető testület:</strong>
                <br />
                Budapesti Békéltető Testület
                <br />
                Cím: 1016 Budapest, Krisztina krt. 99.
                <br />
                Telefon: +36 1 488 2131
                <br />
                E-mail: bekelteto.testulet@bkik.hu
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">11. Záró rendelkezések</h2>
              <p className="text-gray-700 leading-relaxed">
                A Szolgáltató fenntartja a jogot, hogy jelen ÁSZF-et
                bármikor egyoldalúan módosítsa. A módosítások a weboldalon
                történő közzététellel lépnek hatályba. Az ÁSZF legutóbbi
                frissítésének dátuma: 2025. május 1.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
