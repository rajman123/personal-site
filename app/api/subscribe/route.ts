import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'invalid email' }, { status: 400 });
    }

    // TODO: wire to email + Google Sheet sink.
    // For v1: log to console, return ok. Replace with server action that
    // (1) sends notification to rajveer + (2) appends row to Sheet.
    console.log(`[subscribe] ${new Date().toISOString()} ${email}`);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'bad request' }, { status: 400 });
  }
}
