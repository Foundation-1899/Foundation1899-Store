import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ basketIdent: string }> }
) {
  const { basketIdent } = await params;

  try {
    const body = await req.json();
    const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages/remove`, {
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
    return NextResponse.json({ error: 'Failed to remove package' }, { status: 500 });
  }
}
