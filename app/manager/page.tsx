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
      name: "Test Manager",
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
    allOrders = [
      {
        id: 1,
        customerName: "Demo Müşteri",
        status: "completed",
        orderType: "dine-in",
        total: 3500, // 35 TL (kuruş cinsinden)
        createdAt: new Date().toISOString(),
        userName: "Demo User"
      },
      {
        id: 2,
        customerName: "Test Kullanıcı",
        status: "pending",
        orderType: "takeaway",
        total: 2800, // 28 TL
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
        userName: "Test User"
      }
    ];
    
    allProducts = [
      { id: 1, name: "Klasik Döner", price: 2500, isActive: 1 },
      { id: 2, name: "Tavuk Döner", price: 2800, isActive: 1 },
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
          <h1 className="text-3xl font-bold text-gray-800">Yönetici Paneli</h1>
          <p className="mt-2 text-gray-600">
            Hoş geldiniz, {session.user.name}. Rolünüz: 
            <span className="font-semibold text-blue-600 ml-1">{session.user.role}</span>
          </p>
        </div>
        <a 
          href="/manager/products" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg transition-colors"
        >
          📦 Ürünleri Düzenle
        </a>
      </div>
      
      {/* Database Status Indicator */}
      {dbError && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-yellow-600 mr-2">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Development Mode - Mock Data</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Database connection not configured. Using demo data for development.
                <br />
                <span className="text-xs">
                  To enable real data: Set POSTGRES_URL in .env.local with your Vercel Postgres connection string.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Sipariş</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Ciro</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {(totalRevenue / 100).toFixed(2)} ₺
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700">Aktif Ürünler</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{activeProducts}</p>
        </div>
      </div>

      {/* Günlük Ciro Grafiği */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Günlük Ciro Grafiği</h2>
        <div className="h-64 bg-gray-100 rounded-lg mt-4 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <p className="text-gray-500 text-lg">📊 Grafik Alanı</p>
            <p className="text-sm text-gray-400 mt-2">Chart.js veya Recharts entegrasyonu</p>
          </div>
        </div>
      </div>

      {/* Son Siparişler */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Son Siparişler</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">#ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Müşteri</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Durum</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tip</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tutar</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.slice(0, 10).map((order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">#{order.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {order.customerName || order.userName || 'Bilinmiyor'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.orderType}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {(order.total / 100).toFixed(2)} ₺
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {allOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz sipariş bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}