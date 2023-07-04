import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    player: {
      id: string;
    } & DefaultSession['user'];
  }
}
