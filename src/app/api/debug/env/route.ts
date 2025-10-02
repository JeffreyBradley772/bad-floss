import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    has_GOOGLE_CLIENT_ID: Boolean(process.env.GOOGLE_CLIENT_ID),
    has_GOOGLE_CLIENT_SECRET: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    has_NEXTAUTH_SECRET: Boolean(process.env.NEXTAUTH_SECRET),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? null,
    node_env: process.env.NODE_ENV ?? null,
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    DIRECT_URL: Boolean(process.env.DIRECT_URL),
  });
}
