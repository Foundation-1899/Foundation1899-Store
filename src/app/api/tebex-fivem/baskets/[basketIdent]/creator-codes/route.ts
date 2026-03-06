import { NextRequest, NextResponse } from 'next/server';

const TEBEX_TOKEN = process.env.TEBEX_FIVEM_TOKEN;
const BASE_URL = 'https://headless.tebex.io/api/accounts';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ basketIdent: string }> }
) {
  if (!TEBEX_TOKEN) {
    return NextResponse.json({ error: 'TEBEX_FIVEM_TOKEN not configured' }, { status: 503 });
  }

  const { basketIdent } = await params;

  try {
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/${TEBEX_TOKEN}/baskets/${basketIdent}/creator-codes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Tebex API error', detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to apply creator code' }, { status: 500 });
  }
}
