// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "b2b" | "manager"
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role: "b2b" | "manager"
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "b2b" | "manager"
  }
}