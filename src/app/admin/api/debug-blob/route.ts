import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    blobTokenExists: !!process.env.BLOB_READ_WRITE_TOKEN,
    blobTokenLength: process.env.BLOB_READ_WRITE_TOKEN?.length || 0,
    blobTokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 10) || 'none',
  });
}
