// app/manager/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getAllOrders, getAllProducts } from "../../lib/products";

export default async function ManagerPage() {
  // TEMPORARY: Auth check disabled for testing
  // const session = await auth();
  // if (session?.user?.role !== "manager") {
  //   redirect("/");
  // }
  
  // Mock session for testing without auth
  const session = {
    user: {
      name: "Teszt Menedzser", // DİL GÜNCELLEMESİ
      role: "manager"
    }
  };

  // Database connection and data fetching with proper error handling
  let allOrders: any[] = [];
  let allProducts: any[] = [];
  let dbError: string | null = null;
  
  try {
    // Veritabanından veri çekme işlemleri
    allOrders = await getAllOrders();
    allProducts = await getAllProducts();
    console.log("✅ Database connection successful - Real data loaded");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    dbError = error instanceof Error ? error.message : String(error);
    
    // Fallback to mock data for development
    console.log("🔄 Falling back to mock data for development");
    // === DİL VE FİYAT MANTIĞI GÜNCELLEMESİ (MOCK DATA) ===
    allOrders = [
      {
        id: 1,
        customerName: "Demo Vevő",
        status: "completed",
        orderType: "dine-in",
        total: 3500, // 3500 Ft
        createdAt: new Date().toISOString(),
        userName: "Demo User"
      },
      {
        id: 2,
        customerName: "Teszt Felhasználó",
        status: "pending",
        orderType: "takeaway",
        total: 2800, // 2800 Ft
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
        userName: "Test User"
      }
    ];
    
    allProducts = [
      { id: 1, name: "Klasszikus Döner", price: 2500, isActive: 1 },
      { id: 2, name: "Csirke Döner", price: 2800, isActive: 1 },
      { id: 3, name: "Ayran", price: 500, isActive: 1 }
    ];
  }
  
  // Basit istatistikler
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const activeProducts = allProducts.filter(p => p.isActive === 1).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h1 className="text-3xl font-bold text-gray-800">Kezelőpanel</h1>
          <p className="mt-2 text-gray-600">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            Üdvözöljük, {session.user.name}. Az Ön szerepe: 
            <span className="font-semibold text-blue-600 ml-1">{session.user.role}</span>
          </p>
        </div>
        <a 
          href="/manager/products" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-colors"
        >
          {/* === DİL DEĞİŞİKLİĞİ === */}
          📦 Termékek Szerkesztése
        </a>
      </div>
      
      {/* Database Status Indicator */}
      {dbError && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <div>
              {/* === DİL DEĞİŞİKLİĞİ (Hata mesajları) === */}
              <h3 className="text-sm font-medium text-yellow-800">Fejlesztői Mód - Demó Adatok</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Adatbázis-kapcsolat nincs konfigurálva. Demó adatok használatban.
                <br />
                <span className="text-xs">
                  A valódi adatok engedélyezéséhez: Állítsa be a POSTGRES_URL-t a .env.local fájlban.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Összes Rendelés</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Teljes Bevétel</h3>
          {/* === FİYAT VE MANTIK DEĞİŞİKLİĞİ (₺ -> Ft, /100 kaldırıldı) === */}
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalRevenue} Ft
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Aktív Termékek</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{activeProducts}</p>
        </div>
      </div>

      {/* Günlük Ciro Grafiği */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h2 className="text-2xl font-semibold text-gray-800">Napi Bevétel Grafikon</h2>
        <div className="h-64 bg-gray-100 rounded-lg mt-4 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <p className="text-gray-500 text-lg">📊 Grafikon Helye</p>
            <p className="text-sm text-gray-400 mt-2">Chart.js vagy Recharts integráció</p>
          </div>
        </div>
      </div>

      {/* Son Siparişler */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h2 className="text-2xl font-semibold text-gray-800">Legutóbbi Rendelések</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                {/* === DİL DEĞİŞİKLİĞİ (Tablo başlıkları) === */}
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">#ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Vevő</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Státusz</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Típus</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Összeg</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Dátum</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.slice(0, 10).map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">#{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    {order.customerName || order.userName || 'Ismeretlen'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {/* === DİL DEĞİŞİKLİĞİ (Dinamik durumlar) === */}
                      {order.status === 'pending' ? 'Függőben' :
                       order.status === 'completed' ? 'Teljesítve' : order.status}
                    </span>
                  </td>
                  {/* === DİL DEĞİŞİKLİĞİ (Dinamik tipler) === */}
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.orderType === 'dine-in' ? 'Helyben' :
                     order.orderType === 'takeaway' ? 'Elvitel' : 
                     order.orderType === 'delivery' ? 'Kiszállítás' : order.orderType}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {/* === FİYAT VE MANTIK DEĞİŞİKLİĞİ (₺ -> Ft, /100 kaldırıldı) === */}
                    {order.total} Ft
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {/* === TARİH FORMATI DEĞİŞİKLİĞİ === */}
                    {new Date(order.createdAt).toLocaleDateString('hu-HU')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {allOrders.length === 0 && (
            <div className="text-center py-8">
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <p className="text-gray-500">Még nincsenek rendelések.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}