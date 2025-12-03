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
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      return true;
    },

    //   async signIn({ profile }) {
    //     if (!profile?.email) {
    //       throw new Error("No profile");
    //     }
    //     await prisma.user.upsert({
    //       where: {
    //         email: profile.email,
    //       },
    //       create: {
    //         email: profile.email!,
    //         name: profile.name!,
    //       },
    //       update: {
    //         name: profile.name,
    //       },
    //     });
    //     return true;
    //   },
  },
};
// export default NextAuth(authOption);
const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
