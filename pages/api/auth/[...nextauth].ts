import NextAuth, { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// Prisma adapter for NextAuth, optional and can be removed
import { prisma } from "~/server/prisma";
import { env } from "~/server/env.mjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const nextAuthOptions: NextAuthOptions = {
  /*callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    },
    async redirect({ baseUrl }: any) {
      return `${baseUrl}/dashboard`;
    },
  },*/
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "github",
      name: "Mocked GitHub",
      async authorize(credentials) {
        const name = credentials?.name as string;
        const user: User = {
          id: name,
          name: name,
          email: name,
        };
        return user;
      },
      credentials: {
        name: { type: "test" },
      },
    }),
  ],
};

export default NextAuth(nextAuthOptions);
