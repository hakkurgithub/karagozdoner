'use client';

import { useContent } from '../../hooks/useContent';
import Image from 'next/image';

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
              <h2 className="text-3xl font-bold mb-6">Karagöz Döner</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {content.aboutText || "Üdvözöljük a Karagöz Döner-nél! Autentikus török ízeket kínálunk Esztergom szívében. Több évtizedes tapasztalattal és a minőség iránti elkötelezettséggel minden ételünkben érezheti a minőséget és a frissességet."}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Családi vállalkozásunk büszke arra, hogy eredeti török receptekkel és friss alapanyagokkal készíti el minden ételét. Dönerjeink naponta frissen készülnek, kebapjaink pedig a hagyományos török fűszerekkel marinálódnak.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Célunk, hogy minden vendégünk otthonosan érezze magát, és valódi török vendégszeretetet tapasztaljon meg nálunk. Látogasson el hozzánk, és kóstolja meg Esztergom legjobb török specialitásait!
              </p>
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://raw.githubusercontent.com/hakkurgithub/images/main/Karagoz-doner-exterior.png"
                alt="Karagöz Döner Étterem"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Értékeink</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Minőség</h3>
              <p className="text-gray-600">
                Csak a legfrissebb alapanyagokat használjuk, és minden ételünket nagy gondossággal készítjük el.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-heart-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Vendégszeretet</h3>
              <p className="text-gray-600">
                Minden vendégünket családtagként fogadjuk, és törekszünk a legjobb szolgáltatás nyújtására.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-restaurant-line text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hagyomány</h3>
              <p className="text-gray-600">
                Eredeti török recepteket követünk, és tiszteletben tartjuk a hagyományos ízeket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Látogasson el hozzánk!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">Cím</h3>
              <p className="text-gray-700">{content.address}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Telefonszám</h3>
              <p className="text-gray-700">{content.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}