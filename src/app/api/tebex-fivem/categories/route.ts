import { NextResponse } from 'next/server';

const TEBEX_TOKEN = process.env.TEBEX_FIVEM_TOKEN;
const BASE_URL = 'https://headless.tebex.io/api/accounts';

export async function GET() {
  if (!TEBEX_TOKEN) {
    return NextResponse.json({ error: 'TEBEX_FIVEM_TOKEN not configured' }, { status: 503 });
  }

  try {
    const res = await fetch(`${BASE_URL}/${TEBEX_TOKEN}/categories?includePackages=1`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Tebex API error', detail: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
