// app/login/page.tsx  
import { signIn } from "../../lib/auth"
import { redirect } from "next/navigation"

async function loginDemo() {
  "use server"
  await signIn("credentials", { 
    username: "demo", 
    password: "demo",
    redirectTo: "/dashboard"
  })
}

async function loginManager() {
  "use server"
  await signIn("credentials", { 
    username: "manager", 
    password: "manager",
    redirectTo: "/manager"
  })
}

export default function LoginPage() {
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
              <form action={loginDemo}>
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  👤 Demo Kullanıcı Girişi
                </button>
              </form>
              
              <form action={loginManager}>
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  🔑 Manager (Admin) Girişi
                </button>
              </form>
            </div>

            <div className="mt-4 text-sm text-blue-800 space-y-1">
              <p>👤 <strong>Demo:</strong> Kullanıcı dashboard erişimi</p>
              <p>🔑 <strong>Manager:</strong> Ürün düzenleme yetkisi</p>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500">
            <p>Test amaçlı demo hesaplar</p>
            <p>Gerçek üretim ortamında kaldırılmalıdır</p>
          </div>
        </div>
      </div>
    </div>
  )
}