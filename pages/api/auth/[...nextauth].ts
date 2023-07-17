import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { User } from 'next-auth/core/types';
import { prisma } from '@/prisma/prisma';
export const authOptions = {
  session: {
    maxAge: 30 * 60 // 30 Minutes
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        try {
          const player = await prisma.player.findFirst({
            where: { name: credentials.username }
          });

          if (!player?.id || !player?.password) return null;

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            player.password
          );

          if (!passwordsMatch) return null;

          const user = player as unknown as User;

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    redirect: async ({ url }: { url: string }) => {
      return Promise.resolve(url);
    }
  }
};
export default NextAuth(authOptions);
