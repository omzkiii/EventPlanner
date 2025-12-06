import { Awaitable, NextAuthOptions, RequestInternal } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // maxAge: 5 // 5 mins
  },

  // Providers and a Custom Provider
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    /*CredentialsProvider({
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // Find user
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });
        if (!user || !user.password) return null;

        // Compare password
        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        // Return what goes into jwt "user" field
        return { 
          id: user.id, 
          email: user.email, 
          username: user.username 
        };
      } 
    })*/
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
