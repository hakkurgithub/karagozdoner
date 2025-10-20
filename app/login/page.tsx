// app/login/page.tsx
"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (type: "demo" | "manager") => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        username: type,
        password: type,
        redirect: false
      })
      
      if (result?.ok) {
        router.push("/")
        router.refresh()
      } else {
        alert("Giriş başarısız")
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
      alert("Giriş hatası")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Karaköz Döner
          </h1>
          <p className="mt-2 text-gray-600">
            Admin Paneline Giriş
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Demo Hesaplar</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleLogin("demo")}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                👤 Demo Kullanıcı
              </button>
              
              <button
                onClick={() => handleLogin("manager")}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-medium"
              >
                🔑 Manager (Admin)
              </button>
            </div>

            <div className="mt-4 text-sm text-blue-800">
              <p><strong>Demo:</strong> Kullanıcı paneli</p>
              <p><strong>Manager:</strong> Ürün düzenleme yetkisi</p>
            </div>
          </div>

          {isLoading && (
            <div className="text-center text-gray-600">
              Giriş yapılıyor...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}