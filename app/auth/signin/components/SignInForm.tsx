"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
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
        setError("Giriş başarısız! Kullanıcı adı veya şifre hatalı.")
        console.error("Giriş başarısız:", result?.error)
      }
    } catch (error) {
      setError("Giriş hatası oluştu. Lütfen tekrar deneyin.")
      console.error("Giriş hatası:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Admin Giriş Formu */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Admin Girişi</h3>
        
        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleManualLogin} className="space-y-3">
          <div>
            <input
              type="text"
              placeholder="Kullanıcı adı (admin)"
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
            disabled={isLoading || !username || !password}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
        
        <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-700">
            <strong>Admin Giriş:</strong> admin / YeniSifreniz123
          </p>
        </div>
      </div>
    </>
  )
}