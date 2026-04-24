import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    adminPasswordExists: !!process.env.ADMIN_PASSWORD,
    adminPasswordLength: process.env.ADMIN_PASSWORD?.length || 0,
    adminPasswordPrefix: process.env.ADMIN_PASSWORD?.substring(0, 10) || 'none',
    envKeys: Object.keys(process.env).filter(k => k.includes('ADMIN') || k.includes('DATABASE')),
  });
}
