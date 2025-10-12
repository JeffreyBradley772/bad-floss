'use client';

import { signIn, signOut } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navigation({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const isReviewsPage = pathname === '/reviews';
  const [expanded, setExpanded] = useState<boolean>(false);
  const imageUrl = session?.user?.image;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  return (
    <nav className="bg-blue-600 backdrop-blur text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight hover:text-blue-100 transition-colors"
        >
          🦷 Floss Reviews
        </Link>
        <div
          className={`absolute left-1/2 -translate-x-1/2 flex justify-center text-lg font-semibold hover:text-blue-100 transition-colors ${
            !isReviewsPage ? 'animate-pulse' : ''
          }`}
        >
          <Link className="text-center" href="/reviews">
            Reviews Forum
          </Link>
        </div>
        <div className="relative" ref={dropdownRef}>
          {session ? (
            <div className="flex items-center gap-4">
              <Image
                src={imageUrl || ''}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                onClick={() => setExpanded(!expanded)}
              />
              {expanded && (
                <div className="absolute top-full right-5 mt-2 bg-white rounded-md shadow-lg z-10 min-w-[75px]">
                  <button
                    onClick={() => {
                      signOut();
                      setExpanded(false);
                    }}
                    className="w-full bg-blue-500 text-right text-white font-bold px-2 py-2 rounded-tl-md rounded-b-md hover:bg-gray-100 text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 text-sm transition-colors whitespace-nowrap"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
