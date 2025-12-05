import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 5 // 5 mins
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        token.username = dbUser?.username ?? null;
        token.id = dbUser?.id!;
      }
      if (token) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id },
        });

        token.username = dbUser?.username ?? null;
      }
      console.log("JWT SET");
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },

    async signIn({ profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }
      await prisma.user.upsert({
        where: {
          email: profile.email,
        },
        create: {
          email: profile.email!,
          name: profile.name!,
        },
        update: {
          name: profile.name,
        },
      });
      return true;
    },
  },
};
// export default NextAuth(authOption);
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
