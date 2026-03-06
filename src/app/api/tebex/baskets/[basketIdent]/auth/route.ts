import { NextRequest, NextResponse } from 'next/server';

const TEBEX_TOKEN = process.env.TEBEX_TOKEN;
const BASE_URL = 'https://headless.tebex.io/api/accounts';

export async function GET(
  req: NextRequest,
  { params }: { params: { basketIdent: string } }
) {
  if (!TEBEX_TOKEN) {
    return NextResponse.json({ error: 'TEBEX_TOKEN not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const returnUrl = searchParams.get('returnUrl') || '';

  try {
    const res = await fetch(
      `${BASE_URL}/${TEBEX_TOKEN}/baskets/${params.basketIdent}/auth?returnUrl=${encodeURIComponent(returnUrl)}`,
      { headers: { Accept: 'application/json' } }
    );

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Tebex API error', detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to get auth URL' }, { status: 500 });
  }
}
