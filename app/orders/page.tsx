// app/orders/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "../../lib/products";

export default async function OrdersPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  let orders: any[] = [];
  
  try {
    orders = await getUserOrders(session.user.id);
  } catch (error) {
    // === DİL GÜNCELLEMESİ (Hata mesajı) ===
    console.log("DB kapcsolat nincs, mock adat használatban:", error);
    // Mock orders data
    orders = [
      {
        id: 1,
        // === FİYAT MANTIĞI GÜNCELLEMESİ (Yorum) ===
        totalPrice: 3500, // 3500 Ft
        status: "completed",
        orderType: "dine-in",
        customerName: session.user.name,
        // === DİL GÜNCELLEMESİ (Mock telefon) ===
        customerPhone: "+36 20 123 4567",
        createdAt: new Date().toISOString(),
        // === DİL GÜNCELLEMESİ (Mock not) ===
        notes: "Kérem, ne legyen csípős"
      },
      {
        id: 2,
        totalPrice: 2800, // 2800 Ft
        status: "preparing",
        orderType: "takeaway",
        customerName: session.user.name,
        customerPhone: "+36 20 123 4567",
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 órával ezelőtt
        notes: null
      }
    ];
  }

  return (
    <div className="space-y-6">
      <div>
        {/* === DİL GÜNCELLEMESİ === */}
        <h1 className="text-2xl font-bold text-gray-900">Rendeléseim</h1>
        <p className="text-gray-600 mt-1">Itt követheti nyomon az összes rendelését</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="text-4xl mb-4">📋</div>
          {/* === DİL GÜNCELLEMESİ === */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">Még nincsenek rendelései</h3>
          <p className="text-gray-600 mb-4">
            Tekintse meg a menüt az első rendelés leadásához.
          </p>
          <a 
            href="/menu" 
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {/* === DİL DEĞİŞİKLİĞİ === */}
            Menü Megtekintése
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    Rendelés #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {/* === DİL GÜNCELLEMESİ (Tarih formatı) === */}
                    {new Date(order.createdAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    {/* === FİYAT VE PARA BİRİMİ GÜNCELLEMESİ (/100 kaldırıldı) === */}
                    {order.totalPrice} Ft
                  </p>
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : order.status === 'preparing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : order.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {/* === DİL DEĞİŞİKLİĞİ (Durumlar) === */}
                    {order.status === 'completed' ? 'Teljesítve' :
                     order.status === 'preparing' ? 'Készül' :
                     order.status === 'cancelled' ? 'Törölve' : 'Függőben'}
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {/* === DİL DEĞİŞİKLİĞİ === */}
                    <h4 className="font-medium text-gray-900 mb-2">Rendelés Részletei</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      {/* === DİL DEĞİŞİKLİĞİ (Tipler) === */}
                      <p><span className="font-medium">Típus:</span> {
                        order.orderType === 'dine-in' ? 'Helyben' :
                        order.orderType === 'takeaway' ? 'Elvitel' :
                        order.orderType === 'delivery' ? 'Kiszállítás' : 'Helyben'
                      }</p>
                      {order.customerName && (
                        /* === DİL DEĞİŞİKLİĞİ === */
                        <p><span className="font-medium">Név:</span> {order.customerName}</p>
                      )}
                      {order.customerPhone && (
                        /* === DİL DEĞİŞİKLİĞİ === */
                        <p><span className="font-medium">Telefonszám:</span> {order.customerPhone}</p>
                      )}
                    </div>
                  </div>
                  
                  {order.notes && (
                    <div>
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      <h4 className="font-medium text-gray-900 mb-2">Megjegyzések</h4>
                      <p className="text-sm text-gray-600">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {order.status === 'pending' && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Rendelés Törlése
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      {/* === DİL DEĞİŞİKLİĞİ === */}
                      Rendelés Részletei
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}