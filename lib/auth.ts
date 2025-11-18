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
        // Debug logs
        console.log('Login attempt:', {
          username: credentials?.username,
          envUsername: process.env.ADMIN_USERNAME,
          passwordMatch: credentials?.password === process.env.ADMIN_PASSWORD
        });
        
        // Sadece Admin hesap (.env'den)
        if (credentials?.username === process.env.ADMIN_USERNAME && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@karagozdoner.com", 
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