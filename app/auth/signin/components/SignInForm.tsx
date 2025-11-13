"use client"

import { signIn } from "next-auth/react"
import { User, Shield } from "lucide-react"
import { useState } from "react"

export default function SignInForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCredentialsLogin = async (type: "demo" | "manager" | "admin") => {
    setIsLoading(true)
    try {
      let username = type;
      let password = type;
      
      // Admin için özel şifre
      if (type === "admin") {
        username = "admin";
        password = "YeniSifreniz123";
      }
      
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      if (result?.ok) {
        window.location.href = "/"
      } else {
        console.error("Giriş başarısız")
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false
      })
      if (result?.ok) {
        window.location.href = "/"
      } else {
        console.error("Giriş başarısız")
      }
    } catch (error) {
      console.error("Giriş hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-sm font-medium text-blue-900 mb-3">Demo Hesaplar</h3>
        
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <button 
              type="button"
              onClick={() => handleCredentialsLogin("demo")}
              disabled={isLoading}
              className="flex items-center justify-center px-2 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <User className="mr-1 h-3 w-3" />
              Demo
            </button>
            
            <button 
              type="button"
              onClick={() => handleCredentialsLogin("manager")}
              disabled={isLoading}
              className="flex items-center justify-center px-2 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Shield className="mr-1 h-3 w-3" />
              Manager
            </button>
            
            <button 
              type="button"
              onClick={() => handleCredentialsLogin("admin")}
              disabled={isLoading}
              className="flex items-center justify-center px-2 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Shield className="mr-1 h-3 w-3" />
              Admin
            </button>
          </div>
          
          <div className="text-xs text-blue-700">
            <p><strong>Demo User:</strong> demo / demo</p>
            <p><strong>Manager:</strong> manager / manager</p>
            <p><strong>Admin:</strong> admin / YeniSifreniz123</p>
          </div>
        </div>
      </div>

      {/* Manuel Form */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Manuel Giriş</h3>
        
        <form onSubmit={handleManualLogin} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Kullanıcı adı (demo/manager/admin)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </>
  )
}