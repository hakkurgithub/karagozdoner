// lib/menuData.ts

// === DİL GÜNCELLEMESİ (Kategoriler Macarcaya çevrildi) ===
// === YENİ KATEGORİLER EKLENDİ (Wix siteden) ===
export type MenuCategory =
  | "Kebapok és Grillek"
  | "Pide és Lahmacun"
  | "Döner"
  | "Dürüm"
  | "Levesek"
  | "Köretek"
  | "Desszertek"
  | "Italok"
  | "Gyros tálak"
  | "Hamburgerek"
  | "Gyros piták"
  | "Saláták"
  | "Tészták"
  | "Közkedvelt ételek";

export interface MenuItem {
  id: string;
  name: string;
  price: number; // Artık Ft (tam sayı)
  description: string;
  category: MenuCategory;
  image: string;
  rating: number;
}

// === DİL, FİYAT (x10) VE YENİ ÜRÜNLER (Wix) GÜNCELLENDİ ===
// === SÖZDİZİMİ HATASI (fazladan '}') DÜZELTİLDİ ===
export const MENU_ITEMS: MenuItem[] = [
  // --- YENİ EKLENENLER (Wix Menü) ---
  {
    id: "wix-g-01",
    name: "Csirke gyros tál",
    price: 3990, // Gerçek Ft fiyatı
    description: "Gyros tál csirkehússal, friss zöldségekkel és sült krumplival.",
    category: "Gyros tálak",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-g-02",
    name: "Borjú gyros tál",
    price: 4290, // Gerçek Ft fiyatı
    description: "Gyros tál borjúhússal, friss zöldségekkel és sült krumplival.",
    category: "Gyros tálak",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-g-03",
    name: "Vegyes gyros tál",
    price: 4190, // Gerçek Ft fiyatı
    description: "Gyros tál csirke- és borjúhússal, friss zöldségekkel.",
    category: "Gyros tálak",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-h-01",
    name: "Classic burger",
    price: 3190, // Gerçek Ft fiyatı
    description: "Klasszikus hamburger marhahússal.",
    category: "Hamburgerek",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 4,
  },
  {
    id: "wix-h-02",
    name: "Sajt burger",
    price: 3390, // Gerçek Ft fiyatı
    description: "Hamburger marhahússal és sajttal.",
    category: "Hamburgerek",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-gp-01",
    name: "Csirke gyros pita",
    price: 1990, // Gerçek Ft fiyatı
    description: "Gyros pita csirkehússal.",
    category: "Gyros piták",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-gp-02",
    name: "Borjú gyros pita",
    price: 2190, // Gerçek Ft fiyatı
    description: "Gyros pita borjúhússal.",
    category: "Gyros piták",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-s-01",
    name: "Görög saláta",
    price: 2490, // Gerçek Ft fiyatı
    description: "Friss görög saláta.",
    category: "Saláták",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 4,
  },
  {
    id: "wix-t-01",
    name: "Bolognai spagetti",
    price: 3490, // Gerçek Ft fiyatı
    description: "Klasszikus bolognai spagetti.",
    category: "Tészták",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 4,
  },
  {
    id: "wix-k-01",
    name: "Rántott sajt",
    price: 3290, // Gerçek Ft fiyatı
    description: "Rántott sajt rizzsel és tartármártással.",
    category: "Közkedvelt ételek",
    image: "https://static.wixstatic.com/media/2beacd_004c283ddc304ad992708b90e4b32cd3~mv2.jpg", // Örnek resim
    rating: 5,
  },
  {
    id: "wix-i-01",
    name: "Coca-Cola (0,33l)",
    price: 650, // Gerçek Ft fiyatı
    description: "Coca-Cola üdítőital.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cola-fanta-sprite.jpeg",
    rating: 5,
  },
  
  // --- ESKİ MENÜ (Çevrilmiş ve Fiyatları x10 Güncellenmiş) ---
  {
    id: "k-01",
    name: "Adana Kebap (Tál)",
    price: 4500, // 450 * 10
    description: "Különleges fűszerezésű Adana kebap, rizzsel és grillezett zöldségekkel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-02",
    name: "Urfa Kebap (Tál)",
    price: 4500, // 450 * 10
    description: "Nem csípős, aromás Urfa kebap; rizzsel és körettel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-03",
    name: "Beyti Sarma",
    price: 6000, // 600 * 10
    description: "Beyti kebap lavasba tekerve; joghurttal és vajas öntettel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/beyti-sarma.jpg",
    rating: 5,
  },
  {
    id: "k-04",
    name: "Domatesli Kebap",
    price: 5000, // 500 * 10
    description: "Paradicsomszósszal gazdagított kebap, rizzsel és salátával.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/domatesli-kebap.jpg",
    rating: 5,
  },
  {
    id: "k-05",
    name: "Patlıcanlı Kebap (Tál)",
    price: 5000, // 500 * 10
    description: "Grillezett padlizsánnal tálalt kebap.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/patlicanli-kebap-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-06",
    name: "Vegyes Grilltál",
    price: 8000, // 800 * 10
    description: "Adana, urfa, saslik és köfte keveréke gazdag tálon.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-izgara.jpg",
    rating: 5,
  },
  {
    id: "k-07",
    name: "Köfte (Grillezett)",
    price: 3500, // 350 * 10
    description: "Grillezett házi készítésű köfte, rizzsel és zöldekkel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/izgara-kofte.jpeg",
    rating: 4,
  },
  {
    id: "k-08",
    name: "Çöp Şiş (Saslik)",
    price: 5500, // 550 * 10
    description: "Vékony pálcán pácolt hús; parázson sütve.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis.jpg",
    rating: 5,
  },
  {
    id: "k-09",
    name: "Çöp Şiş (Tál)",
    price: 5500, // 550 * 10
    description: "Bőséges adag çöp şiş, rizzsel és körettel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis-porsiyon.jpeg",
    rating: 5,
  },
  {
    id: "k-10",
    name: "Szív (Tál)",
    price: 4500, // 450 * 10
    description: "Grillezett szív; szumákos hagymával és zöldekkel.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yurek-porsiyon.jpeg",
    rating: 5,
  },
  {
    id: "k-11",
    name: "Máj (Tál)",
    price: 4500, // 450 * 10
    description: "Friss máj; grillen tökéletes állagúra sütve.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ciger-porsiyon.jpg",
    rating: 5,
  },
  {
    id: "k-12",
    name: "İskender Kebap",
    price: 5000, // 500 * 10
    description: "Vajjal és joghurttal gazdagított klasszikus iskender.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/iskender-kebap.jpeg",
    rating: 5,
  },
  {
    id: "k-13",
    name: "Csirke Saslik (Tál)",
    price: 4000, // 400 * 10
    description: "Pácolt csirke saslik; rizzsel és salátával.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-porsiyon.jpg",
    rating: 4,
  },
  {
    id: "k-14",
    name: "Csirkeszárny (Tál)",
    price: 3000, // 300 * 10
    description: "Grillezett csirkeszárny adag.",
    category: "Kebapok és Grillek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kanat-porsiyon.jpeg",
    rating: 4,
  },
  {
    id: "dr-01",
    name: "Adana Dürüm",
    price: 2500, // 250 * 10
    description: "Csípős Adana kebap lavasban, friss zöldekkel.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/adana-durum.jpg",
    rating: 5,
  },
  {
    id: "dr-03",
    name: "Urfa Dürüm",
    price: 2500, // 250 * 10
    description: "Urfa kebap lavasban.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/urfa-durum.jpeg",
    rating: 4,
  },
  {
    id: "dr-04",
    name: "Köfte Dürüm",
    price: 2200, // 220 * 10
    description: "Grillezett köftével készített dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kofte-durum.jpg",
    rating: 4,
  },
  {
    id: "dr-05",
    name: "Çöp Şiş Dürüm",
    price: 2500, // 250 * 10
    description: "Çöp şiş (saslik) hússal készített dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cop-sis-durum.jpeg",
    rating: 5,
  },
  {
    id: "dr-06",
    name: "Máj Dürüm",
    price: 2500, // 250 * 10
    description: "Grillezett máj; lavasban, fenséges.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ciger-durum.jpeg",
    rating: 5,
  },
  {
    id: "dr-07",
    name: "Szív Dürüm",
    price: 2400, // 240 * 10
    description: "Grillezett szívvel dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/yure-durum.jpeg",
    rating: 5,
  },
  {
    id: "dr-08",
    name: "Csirke Saslik Dürüm",
    price: 2500, // 250 * 10
    description: "Pácolt csirke saslikkal dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-sis-durum.png",
    rating: 5,
  },
  {
    id: "dr-09",
    name: "Marha Saslik Dürüm",
    price: 3500, // 350 * 10
    description: "Marha saslikkal készített dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/et-sis-durum.png",
    rating: 5,
  },
  {
    id: "dr-10",
    name: "Szárny Dürüm",
    price: 2000, // 200 * 10
    description: "Csirkeszárnnyal készített dürüm.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-kanat-durum.png",
    rating: 4,
  },
  {
    id: "dr-11",
    name: "Dürüm Döner",
    price: 3000, // 300 * 10
    description: "Döner lavasban; öntettel és zöldekkel.",
    category: "Dürüm",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/durum-doner.png",
    rating: 5,
  },
  {
    id: "d-01",
    name: "Marha Döner (Tál)",
    price: 5000, // 500 * 10
    description: "Válogatott húsokból döner; rizzsel és salátával.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/porsiyon-et-doner.jpg",
    rating: 5,
  },
  {
    id: "d-02",
    name: "Marha Döner Rizzsel",
    price: 4500, // 450 * 10
    description: "Ízletes marha döner rizságyon.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/pilav-ustu-et-doner.jpg",
    rating: 5,
  },
  {
    id: "d-02a",
    name: "Klasszikus Döner",
    price: 3000, // 300 * 10
    description: "Hagyományos döner adag.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/doner-kebap.jpg",
    rating: 5,
  },
  {
    id: "d-03",
    name: "Döner Kenyérben",
    price: 2500, // 250 * 10
    description: "Döner íz friss kenyér között.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/ekmek-arasi-doner.jpg",
    rating: 5,
  },
  {
    id: "d-04",
    name: "Csirkedöner (Tál)",
    price: 4000, // 400 * 10
    description: "Csirkedöner; rizzsel és körettel.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/tavuk-doner.jpg",
    rating: 5,
  },
  {
    id: "d-05",
    name: "Dupla Döner",
    price: 5500, // 550 * 10
    description: "Marha és csirke döner keveréke.",
    category: "Döner",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cifte-doner.png",
    rating: 5,
  },
  {
    id: "p-01",
    name: "Lahmacun",
    price: 1300, // 130 * 10
    description: "Vékony tésztán különleges darált húsos töltelék.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/lahmacun.jpg",
    rating: 5,
  },
  {
    id: "p-02",
    name: "Diós Lahmacun",
    price: 1600, // 160 * 10
    description: "Darált húsos töltelék dióval gazdagítva.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cevizli-lahmacun.jpg",
    rating: 5,
  },
  {
    id: "p-03",
    name: "Diós-Gránátalmás Lahmacun",
    price: 1700, // 170 * 10
    description: "Dióval és gránátalmasziruppal gazdagítva.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cevizli-nar-eksili-lahmacun.jpg",
    rating: 5,
  },
  {
    id: "p-04",
    name: "Vegyes Pide",
    price: 4000, // 400 * 10
    description: "Sucuk, kashkaval sajt, darált hús és tojás keveréke.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/karisik-pide.jpeg",
    rating: 5,
  },
  {
    id: "p-05",
    name: "Sajtos Pide",
    price: 4000, // 400 * 10
    description: "Bőséges kashkaval sajttal, ropogós szélekkel.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kasarli-peynirli-pide.jpg",
    rating: 5,
  },
  {
    id: "p-06",
    name: "Sucukos-Sajtos Pide",
    price: 3800, // 380 * 10
    description: "Sucuk (török kolbász) és sajt harmóniája.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sucuklu-kasarli-pide.jpg",
    rating: 5,
  },
  {
    id: "p-07",
    name: "Darált Húsos Pide",
    price: 4200, // 420 * 10
    description: "Fűszeres darált hússal készített klasszikus pide.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiymali-pide.jpg",
    rating: 5,
  },
  {
    id: "p-08",
    name: "Darált Húsos-Sajtos Pide",
    price: 4500, // 450 * 10
    description: "Darált hús és kashkaval sajt, gazdag tartalommal.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kiyma-kasarli-pide.jpg",
    rating: 5,
  },
  {
    id: "p-09",
    name: "Kavurmalı Pide",
    price: 4500, // 450 * 10
    description: "Bőséges pirított hússal (kavurma), laktató pide.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kavurmali-pide.jpg",
    rating: 5,
  },
  {
    id: "p-10",
    name: "Kavurmalı-Sajtos Pide",
    price: 4700, // 470 * 10
    description: "Pirított hús és sajt egyedülálló párosa.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kavurma-kasarli-pide.jpg",
    rating: 5,
  },
  {
    id: "p-11",
    name: "Kuşbaşılı Pide",
    price: 4500, // 450 * 10
    description: "Kockázott hússal (kuşbaşı) készített pide.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasili-pide.jpg",
    rating: 5,
  },
  {
    id: "p-13",
    name: "Kuşbaşılı-Sajtos Pide",
    price: 4700, // 470 * 10
    description: "Kockázott hús + kashkaval sajt.",
    category: "Pide és Lahmacun",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kusbasi-kasarli-pide.jpg",
    rating: 5,
  },
  {
    id: "c-01",
    name: "Lencseleves",
    price: 400, // 40 * 10
    description: "Hagyományos vörös lencseleves.",
    category: "Levesek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mercimek-corbasi.jpg",
    rating: 5,
  },
  {
    id: "y-01",
    name: "Idénysaláta",
    price: 500, // 50 * 10
    description: "Friss zöldségekből készült könnyű és frissítő.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/mevsim-salatasi.jpeg",
    rating: 5,
  },
  {
    id: "y-02",
    name: "İçli Köfte",
    price: 800, // 80 * 10
    description: "Kívül ropogós, belül gazdagon darált húsos.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/icli-kofte.jpg",
    rating: 5,
  },
  {
    id: "y-03",
    name: "Çiğ Köfte (Tál)",
    price: 1200, // 120 * 10
    description: "Házi készítésű çiğ köfte, zöldekkel és gránátalmasziruppal.",
    category: "Köretek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cig-kofte-porsiyon.jpeg",
    rating: 5,
  },
  {
    id: "t-01",
    name: "Künefe",
    price: 900, // 90 * 10
    description: "Sajtos cérnametélt desszert; melegen tálalva.",
    category: "Desszertek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/kunefe.jpeg",
    rating: 5,
  },
  {
    id: "t-02",
    name: "Sütőben Sült Tejberizs",
    price: 600, // 60 * 10
    description: "Klasszikus sütőben sült tejberizs; fahéjjal.",
    category: "Desszertek",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/firin-sutlac.jpeg",
    rating: 5,
  },
  {
    id: "i-01",
    name: "Házi Ayran",
    price: 250, // 25 * 10
    description: "Frissítő házi készítésű ayran.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/acik-ayran.jpg",
    rating: 5,
  },
  {
    id: "i-01a",
    name: "Tea",
    price: 150, // 15 * 10
    description: "Hagyományos, vékony pohárban tálalt forró tea.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/acik-ayran.jpg", // Helyettesítő kép
    rating: 5,
  },
  {
    id: "i-02",
    name: "Ásványvíz (Szénsavas)",
    price: 200, // 20 * 10
    description: "Természetes ásványvíz.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/sade-soda.jpeg",
    rating: 5,
  },
  {
    id: "i-03",
    name: "Şalgam (Céklalé)",
    price: 250, // 25 * 10
    description: "Adana stílusú; csípős/nem csípős változatban.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/salgam.jpg",
    rating: 5,
  },
  {
    id: "i-03a",
    name: "Kóla",
    price: 200, // 20 * 10
    description: "Kóla szervírozva.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cola-fanta-sprite.jpeg",
    rating: 5,
  },
  {
    id: "i-04",
    name: "Víz (Szénsavmentes)",
    price: 100, // 10 * 10
    description: "Hideg ivóvíz.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/su.jpg",
    rating: 5,
  },
  {
    id: "i-05",
    name: "Ízesített Ásványvíz",
    price: 250, // 25 * 10
    description: "Frissítő ásványvíz különböző ízekben.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/meyvelisoda.jpeg",
    rating: 5,
  },
  {
    id: "i-06",
    name: "Gyümölcslé",
    price: 250, // 25 * 10
    description: "Hideg, friss gyümölcslevek.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/meyve-suyu.jpeg",
    rating: 5,
  },
  {
    id: "i-07",
    name: "Kóla / Fanta / Sprite",
    price: 250, // 25 * 10
    description: "Népszerű szénsavas üdítők.",
    category: "Italok",
    image: "https://raw.githubusercontent.com/hakkurgithub/images/main/cola-fanta-sprite.jpeg",
    rating: 5,
  }
];