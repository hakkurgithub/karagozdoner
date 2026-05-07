"use client";

import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "a-doner-tortenete",
      title: "A Döner Története: Az Oszmán Birodalomtól a Világsikerig",
      excerpt:
        "Ismerje meg a döner eredetét! Hogyan vált az oszmán szultánok kedvenc ételéből a világ egyik legnépszerűbb gyorsételévé? Utazás az időben a török gasztronómia egyik ikonikus fogásával.",
      date: "2025. március 15.",
      category: "Történelem",
      readTime: "5 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-hero.jpg",
    },
    {
      slug: "torok-fuszerek",
      title: "A Török Konyha 5 Legfontosabb Fűszere",
      excerpt:
        "A török konyha titka a fűszerekben rejlik. Ismerje meg a sumak, a pul biber, a kömény, a fahéj és a szerecsendió szerepét az autentikus török ételekben, és tudja meg, hogyan használjuk mi ezeket a Karagöz Dönernél.",
      date: "2025. február 28.",
      category: "Gasztronómia",
      readTime: "4 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg",
    },
    {
      slug: "adana-kebap",
      title: "Adana Kebap: A Tűz és a Fűszer Tánca",
      excerpt:
        "Az Adana kebap Törökország egyik legismertebb specialitása. Mi a titka a tökéletes Adana kebapnak? Milyen húst használunk, hogyan fűszerezzük, és miért grillezzük nyílt lángon? Minden, amit tudni szeretett volna.",
      date: "2025. január 20.",
      category: "Receptek",
      readTime: "6 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-kebap.jpg",
    },
    {
      slug: "esztergom-latnivalok",
      title: "Esztergom Látványosságai és a Török Gasztronómia",
      excerpt:
        "Látogasson el Esztergomba, és fedezze fel a város nevezetességeit! A Bazilika, a Prímás-sziget és a vár mellett ne hagyja ki a Karagöz Dönert sem. Így tehet teljessé esztergomi kirándulását.",
      date: "2025. január 10.",
      category: "Esztergom",
      readTime: "3 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karagoz-doner.jpg",
    },
    {
      slug: "miert-a-karagoz-doner",
      title: "Miért Pont a Karagöz Döner? 10 Ok, amiért Érdemes Meglátogatnunk",
      excerpt:
        "Összegyűjtöttük azt a 10 legfontosabb okot, amiért vendégeink visszatérnek hozzánk. A minőségtől a hangulaton át a barátságos árakig - ezek mind a Karagöz Döner erősségei.",
      date: "2024. december 15.",
      category: "Éttermünk",
      readTime: "4 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/gyros-tal.jpg",
    },
    {
      slug: "hazilag-torok-pita",
      title: "Hogyan Készítsünk Házilag Török Pitát?",
      excerpt:
        "Szeretné otthon elkészíteni a tökéletes török pitát? Lépésről lépésre mutatjuk be receptünket, amivel puha, lyukacsos és ínycsiklandó pitákat készíthet otthonában is.",
      date: "2024. november 30.",
      category: "Receptek",
      readTime: "7 perc",
      image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender-kebab.jpg",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Török gasztronómiai érdekességek, receptek és hírek a Karagöz Dönertől.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} olvasás</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-red-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-red-600 font-semibold hover:text-red-700 transition-colors inline-flex items-center"
                    >
                      Elolvasom
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-red-600 text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Iratkozzon fel hírlevelünkre!
          </h2>
          <p className="text-lg mb-8">
            Legyen az elsők között, akik értesülnek új ételeinkről, különleges
            ajánlatainkról és eseményeinkről.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Az Ön e-mail címe"
              className="px-6 py-3 rounded-full text-gray-800 w-full sm:w-auto sm:min-w-[300px] focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-red-600 font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Feliratkozás
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
