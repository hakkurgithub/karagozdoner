// app/(dashboard)/layout.tsx
import { auth } from "../../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-800">🍽️ Karagöz Döner</h1>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                Kullanıcı Panel
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Merhaba, {session.user.name}
              </span>
              <Link 
                href="/api/auth/signout"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Çıkış
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* User Sidebar & Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-6">
            <nav className="space-y-2">
              <a 
                href="/dashboard" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-green-50 text-green-700 font-medium"
              >
                <span>🏠</span>
                <span>Ana Sayfa</span>
              </a>
              
              <a 
                href="/dashboard/orders" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span>📋</span>
                <span>Siparişlerim</span>
              </a>
              
              <a 
                href="/menu" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span>🍽️</span>
                <span>Menü</span>
              </a>
              
              <a 
                href="/reservation" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span>📅</span>
                <span>Rezervasyon</span>
              </a>
              
              <a 
                href="/dashboard/profile" 
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span>👤</span>
                <span>Profilim</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}