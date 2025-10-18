// app/(dashboard)/dashboard/page.tsx
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { getOrdersByUser } from "../../../lib/products";
import { Order } from "../../../db/schema";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Kullanıcının siparişlerini çek
  const userOrders = await getOrdersByUser(parseInt(session.user.id));
  
  // Kullanıcı istatistikleri
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum: number, order: Order) => sum + order.total, 0);
  const completedOrders = userOrders.filter((order: Order) => order.status === 'completed').length;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800">Kullanıcı Paneli</h1>
      <p className="mt-2 text-gray-600">
        Hoş geldiniz, {session.user.name}. Rolünüz: 
        <span className="font-semibold text-green-600 ml-1">{session.user.role}</span>
      </p>
      
      {/* Kullanıcı İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Siparişim</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Toplam Harcamam</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {(totalSpent / 100).toFixed(2)} ₺
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold text-gray-700">Tamamlanan</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{completedOrders}</p>
        </div>
      </div>

      {/* Hızlı İşlemler */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              <p className="font-semibold text-blue-800">Yeni Sipariş</p>
              <p className="text-sm text-blue-600">Menüden sipariş ver</p>
            </div>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📅</div>
              <p className="font-semibold text-green-800">Rezervasyon</p>
              <p className="text-sm text-green-600">Masa rezerve et</p>
            </div>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-semibold text-purple-800">Geçmiş</p>
              <p className="text-sm text-purple-600">Sipariş geçmişi</p>
            </div>
          </button>
        </div>
      </div>

      {/* Son Siparişlerim */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Son Siparişlerim</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">#ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Durum</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tip</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tutar</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tarih</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.slice(0, 5).map((order: Order) => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">#{order.id}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'pending' ? 'Bekliyor' :
                       order.status === 'completed' ? 'Tamamlandı' : order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.orderType === 'dine-in' ? 'Restoranda' :
                     order.orderType === 'takeaway' ? 'Paket' : 
                     order.orderType === 'delivery' ? 'Teslimat' : order.orderType}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                    {(order.total / 100).toFixed(2)} ₺
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {userOrders.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Henüz siparişiniz bulunmuyor.</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                İlk Siparişinizi Verin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}