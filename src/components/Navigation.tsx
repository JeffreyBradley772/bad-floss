'use client';

import { signIn, signOut } from 'next-auth/react';

export default function Navigation({ session }: { session: any }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          Floss Reviews
        </a>
        <div>
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
