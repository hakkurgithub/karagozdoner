import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({  
  providers: [
    // Demo credentials provider
    Credentials({
      // === DİL GÜNCELLEMESİ ===
      name: "Demó",
      credentials: {
        username: { label: "Felhasználónév", type: "text", placeholder: "demo" },
        password: { label: "Jelszó", type: "password", placeholder: "demo" }
      },
      async authorize(credentials) {
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return {
            id: "1",
            // === DİL GÜNCELLEMESİ ===
            name: "Demó Felhasználó",
            email: "demo@karagozdoner.com",
            role: "b2b" as const,
          }
        }
        if (credentials?.username === "manager" && credentials?.password === "manager") {
          return {
            id: "2", 
            // === DİL GÜNCELLEMESİ ===
            name: "Demó Menedzser",
            email: "manager@karagozdoner.com",
            role: "manager" as const,
          }
        }
        return null
      }
    }),
    // GitHub OAuth (valódi hitelesítő adatok szükségesek)
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'b2b' // Szerepkör átvétele a User objektumból
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as "b2b" | "manager"
      }
      return session
    },
  },
  
  debug: process.env.NODE_ENV === "development",
})