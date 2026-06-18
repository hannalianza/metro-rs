import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  const filename = request.nextUrl.searchParams.get('filename');
  if (!url || !filename) return NextResponse.json({ error: 'Missing params' }, { status: 400 });

  const resp = await fetch(url);
  if (!resp.ok) return NextResponse.json({ error: `Fetch failed: ${resp.status}` }, { status: 500 });

  const buffer = Buffer.from(await resp.arrayBuffer());
  const dest = path.join(process.cwd(), 'public', 'products', filename);
  fs.writeFileSync(dest, buffer);

  return NextResponse.json({ ok: true, bytes: buffer.length, dest });
}
