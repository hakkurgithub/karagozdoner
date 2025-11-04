// app/profile/page.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "../../lib/products";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  const orders = await getUserOrders(session.user.id);
  const totalSpent = orders.reduce((sum: number, order: any) => sum + order.totalPrice, 0);
  const loyaltyPoints = orders.length * 10;

  return (
    <div className="space-y-6">
      <div>
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h1 className="text-2xl font-bold text-gray-900">Fiókom</h1>
        <p className="text-gray-600 mt-1">Tekintse meg fiókja adatait és statisztikáit</p>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{session.user.name}</h2>
            <p className="text-gray-600">{session.user.email}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mt-2">
              {/* === DİL DEĞİŞİKLİĞİ === */}
              {session.user.role === 'b2b' ? 'B2B Ügyfél' : 'Standard Ügyfél'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{orders.length}</div>
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <div className="text-sm text-gray-600">Összes Rendelés</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {/* === FİYAT VE MANTIK DEĞİŞİKLİĞİ (₺ -> Ft, /100 kaldırıldı) === */}
              {totalSpent} Ft
            </div>
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <div className="text-sm text-gray-600">Összes Költés</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{loyaltyPoints}</div>
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <div className="text-sm text-gray-600">Hűségpontok</div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiók Beállítások</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <h4 className="font-medium text-gray-900">E-mail Értesítések</h4>
              <p className="text-sm text-gray-600">Rendelés állapota és promóciós információk</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3 border-b">
            <div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <h4 className="font-medium text-gray-900">SMS Értesítések</h4>
              <p className="text-sm text-gray-600">SMS fogadása, ha a rendelés kész</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex justify-between items-center py-3">
            <div>
              {/* === DİL DEĞİŞİKLİĞİ === */}
              <h4 className="font-medium text-gray-900">Marketing Kommunikáció</h4>
              <p className="text-sm text-gray-600">Különleges ajánlatok és promóciók</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Loyalty Program */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">⭐</span>
          {/* === DİL DEĞİŞİKLİĞİ === */}
          <h3 className="text-lg font-semibold text-gray-900">Hűségprogram</h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            <span className="text-sm font-medium text-gray-700">Jelenlegi Pontszám</span>
            <span className="text-sm font-bold text-gray-900">{loyaltyPoints} pont</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((loyaltyPoints % 100), 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {/* === DİL DEĞİŞİKLİĞİ === */}
            {100 - (loyaltyPoints % 100)} pont hiányzik a következő szinthez
          </p>
        </div>

        <div className="text-sm text-gray-700">
          {/* === DİL VE PARA BİRİMİ DEĞİŞİKLİĞİ === */}
          <p className="mb-2">🎁 Szerezzen 10 pontot minden rendelés után</p>
          <p className="mb-2">🍽️ 100 pont = 10 Ft kedvezmény</p>
          <p>🎂 20% extra pont a születésnapi hónapjában</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-4">
        {/* === DİL DEĞİŞİKLİĞİ === */}
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Profil Szerkesztése
        </button>
        <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          Jelszó Módosítása
        </button>
        <Link 
          href="/api/auth/signout" 
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          {/* === DİL DEĞİŞİKLİĞİ === */}
          Kijelentkezés
        </Link>
      </div>
    </div>
  );
}