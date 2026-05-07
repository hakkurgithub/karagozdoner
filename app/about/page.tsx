"use client";

import { useContent } from "../../hooks/useContent";
import Image from "next/image";

export default function About() {
  const { content } = useContent();

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Rólunk</h1>
          <p className="text-xl md:text-2xl">
            Autentikus török ízek Esztergom szívében
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Karagöz Döner - A Tradíció és az Ízek Találkozása
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {content.aboutText ||
                  "A Karagöz Döner Esztergom szívében, a Kossuth Lajos utca 30. szám alatt hozza el Önnek az eredeti török ízeket. Családi vállalkozásunk több mint egy évtizedes tapasztalattal áll vendégeink rendelkezésére, hogy a legjobb minőségű döner, kebab és gyros specialitásokat kínáljuk."}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Családi vállalkozásunk büszke arra, hogy eredeti török
                receptekkel és friss alapanyagokkal készíti el minden ételét.
                Dönerjeink naponta frissen készülnek, kebapjaink pedig a
                hagyományos török fűszerekkel marinálódnak. Minden egyes
                fogásunkban érezhető a szenvedély, amivel készítjük őket.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Hisszük, hogy a minőségi étkezés nem csupán táplálékbevitel,
                hanem egy élmény. Ezért törekszünk arra, hogy vendégeink ne
                csupán jóllakjanak, hanem valódi gasztronómiai élményben is
                részesüljenek. Az Adana kebap fűszeres aromái, az Iskender
                kebab gazdag joghurtos öntete, vagy egy egyszerű, de tökéletesen
                elkészített döner - mindegyik ételünk mögött történet és
                hagyomány áll.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Célunk, hogy minden vendégünk otthonosan érezze magát, és
                valódi török vendégszeretetet tapasztaljon meg nálunk. Látogasson
                el hozzánk, és kóstolja meg Esztergom legjobb török
                specialitásait! Legyen szó egy gyors ebédről munka közben,
                egy családi vacsoráról vagy egy baráti összejövetelről - mi
                mindig szeretettel várjuk.
              </p>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg"
                alt="Karagöz Döner Étterem belső tere és frissen készült döner"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            A Karagöz Döner Története
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              A Karagöz Döner története egy családi álom megvalósulásaként
              kezdődött. Alapítóink célja az volt, hogy az autentikus török
              ízeket közelebb hozzák az esztergomiak és a városba látogatók
              számára. A tradicionális recepteket és elkészítési módokat
              generációról generációra örökítve hoztuk el Magyarországra a
              felejthetetlen kebab és döner élményt.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Kezdetben egy kis büfével indultunk, ahol a helyiek hamar
              megszerették a frissen sütött pitákat és a mesterien fűszerezett
              húsokat. Az évek során folyamatosan bővítettük étlapunkat,
              miközben megőriztük az eredeti ízeket és a minőséget. Ma már
              Esztergom egyik legnépszerűbb török éttermeként várjuk vendégeinket
              egy tágas, barátságos környezetben.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Büszkék vagyunk arra, hogy sok vendégünk már évek óta hűségesen
              visszatér hozzánk, és hogy egyre több turista is úticéljául
              választja éttermünket, amikor Esztergomban jár. A Bazilika
              közelében, könnyen megközelíthető helyen várjuk Önt is, hogy
              részese lehessen a Karagöz Döner élménynek.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Értékeink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Minőség</h3>
              <p className="text-gray-600 leading-relaxed">
                Csak a legfrissebb alapanyagokat használjuk, és minden ételünket
                nagy gondossággal készítjük el. A húsokat naponta frissen
                szeleteljük, a zöldségeket pedig minden reggel válogatjuk.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-heart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vendégszeretet</h3>
              <p className="text-gray-600 leading-relaxed">
                Minden vendégünket családtagként fogadjuk, és törekszünk a
                legjobb szolgáltatás nyújtására. A mosolygós kiszolgálás és a
                figyelmes személyzet nálunk alapvető elvárás.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hagyomány</h3>
              <p className="text-gray-600 leading-relaxed">
                Eredeti török recepteket követünk, és tiszteletben tartjuk a
                hagyományos ízeket. Főszakácsaink török szakemberek, akik a
                hazájukban szerzett tudásukat hozták el hozzánk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Minőségi Garancia
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-gray-700 text-lg leading-relaxed">
              A Karagöz Dönernél kiemelt figyelmet fordítunk az élelmiszer-
              biztonságra és a higiéniára. Konyhánk rendszeresen ellenőrzött,
              dolgozóink egészségügyi kiskönyvvel rendelkeznek, és folyamatosan
              képezzük őket a legjobb gyakorlatok terén.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Ha bármilyen okból nem elégedett ételeink minőségével, kérjük,
              azonnal jelezze kollégáinknak, és mi kicseréljük vagy visszatérítjük
              az árát. Vendégeink elégedettsége számunkra a legfontosabb
              visszajelzés.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Látogasson el hozzánk!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">Cím</h3>
              <p>{content.address}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Telefonszám</h3>
              <a
                href={`tel:${content.phone?.replace(/\s/g, "")}`}
                className="hover:underline"
              >
                {content.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
