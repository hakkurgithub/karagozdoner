// app/dashboard/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getOrdersByUser } from "../../lib/products";
import { Order } from "../../db/schema";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Felhasználói rendelések lekérése
  const userOrders = await getOrdersByUser(parseInt(session.user.id));
  
  // Felhasználói statisztikák
  const totalOrders = userOrders.length;
  const totalSpent = userOrders.reduce((sum: number, order: Order) => sum + order.total, 0);
  const completedOrders = userOrders.filter((order: Order) => order.status === 'completed').length;

  return (
    <div className="container mx-auto p-4">
      {/* === DİL DEĞİŞİKLİĞİ === */}
      <h1 className="text-3xl font-bold text-gray-800">Fiókom</h1>
      <p className="mt-2 text-gray-600">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        Üdvözöljük, {session.user.name}. Az Ön szerepe: 
        <span className="font-semibold text-green-600 ml-1">{session.user.role}</span>
      </p>
      
      {/* Felhasználói Statisztikák */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Összes Rendelés</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Összes Költés</h3>
          {/* === FİYAT VE MANTIK DEĞİŞİKLİĞİ (₺ -> Ft, /100 kaldırıldı) === */}
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalSpent} Ft
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-700">Teljesített</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">{completedOrders}</p>
        </div>
      </div>

      {/* Gyors Műveletek */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h2 className="text-2xl font-semibold text-gray-800">Gyors Műveletek</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">🍽️</div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <p className="font-semibold text-blue-800">Új Rendelés</p>
              <p className="text-sm text-blue-600">Rendelés a menüből</p>
            </div>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📅</div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <p className="font-semibold text-green-800">Asztalfoglalás</p>
              <p className="text-sm text-green-600">Foglaljon asztalt</p>
            </div>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <p className="font-semibold text-purple-800">Előzmények</p>
              <p className="text-sm text-purple-600">Rendelési előzmények</p>
            </div>
          </button>
        </div>
      </div>

      {/* Legutóbbi Rendelések */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h2 className="text-2xl font-semibold text-gray-800">Legutóbbi Rendelések</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                {/* === DİL DEĞİŞİKLİĞİ (Başlıklar) === */}
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">#ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Státusz</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Típus</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Összeg</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Dátum</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Művelet</th>
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
                      {/* === DİL DEĞİŞİKLİĞİ (Durumlar) === */}
                      {order.status === 'pending' ? 'Függőben' :
                       order.status === 'completed' ? 'Teljesítve' : order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {/* === DİL DEĞİŞİKLİĞİ (Tipler) === */}
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
                  <td className="px-4 py-3">
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Részletek
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {userOrders.length === 0 && (
            <div className="text-center py-8">
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <p className="text-gray-500">Még nincsenek rendelései.</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Adja le első rendelését
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}