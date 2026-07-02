import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
    }

    // Simulate backend processing
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ ok: true, message: "Message received. We will respond within 24 hours." });
  } catch {
    return NextResponse.json({ ok: false, error: "Network error. Please try again." }, { status: 500 });
  }
}
