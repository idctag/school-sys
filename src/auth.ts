import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { db } from "./db";
import users from "./db/schemas/user";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  pages: {
    error: "/api/auth/error",
  },
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const data = (
        await db.select().from(users).where(eq(users.id, user.id))
      )[0];
      session.user.role = data.role;
      return session;
    },
    async signIn({ profile }) {
      if (!profile) return false;

      const user = (
        await db.select().from(users).where(eq(users.email, profile.email!))
      )[0];

      if (!user && profile.email === ADMIN_EMAIL) {
        await db.insert(users).values({
          email: ADMIN_EMAIL,
          role: "admin",
        });
        return true;
      }
      return user ? true : false;
    },
  },
});
