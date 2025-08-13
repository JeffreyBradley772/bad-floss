import { DefaultSession, DefaultUser } from 'next-auth';

// Module augmentation to extend NextAuth types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isVerified: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    isVerified: boolean;
  }
}
