import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { createUser, getUserByEmail } from "./products" // Bu dosyanın db bağlantısını supabase.ts'den aldığından emin olun

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Admin",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text", placeholder: "admin" },
        password: { label: "Şifre", type: "password", placeholder: "Şifre" }
      },
      async authorize(credentials) {
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Admin user'ı veritabanında bul veya oluştur
          const email = "admin@karagozdoner.com";
          let user = await getUserByEmail(email);
          if (!user) {
            user = await createUser({
              name: "Admin",
              email,
              role: "manager"
            });
          }
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
        return null;
      }
    })
  ],
  
  session: {
    strategy: "jwt",
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'manager';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // DÜZELTME: Token id veya sub yoksa boş string ata ve string olarak zorla
        session.user.id = (token.id || token.sub || "") as string;
        session.user.role = token.role as "b2b" | "manager";
      }
      return session;
    },
  },
  
  debug: process.env.NODE_ENV === "development",
});