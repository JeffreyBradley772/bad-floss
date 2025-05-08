'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Navigation({ session }: { session: Session | null }) {
  return (
    <nav className="bg-blue-600 backdrop-blur text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors">
          🦷 Floss Reviews
        </a>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-100">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
