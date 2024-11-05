import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Google from "next-auth/providers/google";
import { db } from "./drizzle/db";
import { users } from "./drizzle/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "user", ...profile };
      },
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
  },
});
