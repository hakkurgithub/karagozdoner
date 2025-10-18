import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({  
  providers: [
    // Demo credentials provider
    Credentials({
      name: "Demo",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "demo" },
        password: { label: "Password", type: "password", placeholder: "demo" }
      },
      async authorize(credentials) {
        if (credentials?.username === "demo" && credentials?.password === "demo") {
          return {
            id: "1",
            name: "Demo User",
            email: "demo@karagozdoner.com",
            role: "b2b" as const,
          }
        }
        if (credentials?.username === "manager" && credentials?.password === "manager") {
          return {
            id: "2", 
            name: "Manager Demo",
            email: "manager@karagozdoner.com",
            role: "manager" as const,
          }
        }
        return null
      }
    }),
    // GitHub OAuth (gerçek credentials gerekli)
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
        token.role = user.role || 'b2b' // User objesinden role alıyoruz
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
  
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
  
  debug: process.env.NODE_ENV === "development",
})