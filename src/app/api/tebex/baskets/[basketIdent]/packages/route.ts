import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://headless.tebex.io/api/baskets';

export async function POST(
  req: NextRequest,
  { params }: { params: { basketIdent: string } }
) {
  try {
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/${params.basketIdent}/packages`, {
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
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add package' }, { status: 500 });
  }
}
