import Link from "next/link";

// BU SATIR BUILD HATASINI ENGELLER
export const dynamic = 'force-dynamic';

export default async function ManagerDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Yonetim Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/manager/products" className="block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Urun Yonetimi</h2>
          <p className="text-gray-600">Menudeki urunleri ve fiyatlari duzenleyin.</p>
        </Link>
        
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 opacity-75">
          <h2 className="text-xl font-semibold text-gray-500 mb-2">Siparisler</h2>
          <p className="text-gray-500">Siparis takibi yakinda eklenecek.</p>
        </div>
      </div>
    </div>
  );
}
