// app/login/page.tsx  
"use client"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = (type: "demo" | "manager") => {
    // Client-side yönlendirme
    const redirectUrl = type === "manager" ? "/manager" : "/dashboard"
    
    // NextAuth credential sağlayıcısına POST isteği
    fetch("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: type,
        password: type,
        redirect: false
      })
    }).then(() => {
      router.push(redirectUrl)
      router.refresh()
    }).catch((err) => {
      console.error("Login error:", err)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            🥙 Karaköz Döner
          </h1>
          <p className="mt-2 text-gray-600">
            Admin Paneline Giriş
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Demo Hesaplar</h3>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleLogin("demo")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                👤 Demo Kullanıcı Girişi
              </button>
              
              <button 
                onClick={() => handleLogin("manager")}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                🔑 Manager (Admin) Girişi
              </button>
            </div>

            <div className="mt-4 text-sm text-blue-800 space-y-1">
              <p>👤 <strong>Demo:</strong> Kullanıcı dashboard erişimi</p>
              <p>🔑 <strong>Manager:</strong> Ürün düzenleme yetkisi</p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Test amaçlı demo hesaplar</p>
          </div>
        </div>
      </div>
    </div>
  )
}