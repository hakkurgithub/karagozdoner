// app/(dashboard)/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "../../lib/products";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await getUserOrders(session.user.id);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Hoş Geldin, {session.user.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">Karagöz Döner&apos;e hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📋
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Toplam Sipariş</h3>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                💰
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Toplam Harcama</h3>
              <p className="text-2xl font-bold text-gray-900">
                ₺{(orders.reduce((sum: number, order: any) => sum + order.totalPrice, 0) / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                ⭐
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Sadakat Puanı</h3>
              <p className="text-2xl font-bold text-gray-900">{orders.length * 10}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Son Siparişler</h2>
          <a 
            href="/dashboard/orders" 
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            Tümünü Görüntüle
          </a>
        </div>
        
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🍽️</div>
            <p className="text-gray-600">Henüz sipariş vermediniz.</p>
            <a 
              href="/menu" 
              className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Menüyü İncele
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order: any) => (
              <div key={order.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">Sipariş #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₺{(order.totalPrice / 100).toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'preparing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'completed' ? 'Tamamlandı' :
                     order.status === 'preparing' ? 'Hazırlanıyor' : 'Bekliyor'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/menu" 
          className="block p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          <div className="text-3xl mb-2">🍽️</div>
          <h3 className="text-lg font-semibold mb-1">Menü</h3>
          <p className="text-blue-100">Lezzetli ürünlerimizi keşfedin</p>
        </a>
        
        <a 
          href="/reservation" 
          className="block p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105"
        >
          <div className="text-3xl mb-2">📅</div>
          <h3 className="text-lg font-semibold mb-1">Rezervasyon</h3>
          <p className="text-green-100">Masa rezervasyonu yapın</p>
        </a>
        
        <a 
          href="/cart" 
          className="block p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          <div className="text-3xl mb-2">🛒</div>
          <h3 className="text-lg font-semibold mb-1">Sepet</h3>
          <p className="text-purple-100">Siparişinizi tamamlayın</p>
        </a>
      </div>
    </div>
  );
}