import { NextResponse } from "next/server";
import { forgotPassword, extractError } from "@/lib/justjobApi";
import { normalizeNigerianPhone } from "@/lib/phone";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { phone?: string; countryCode?: string };
    const number = normalizeNigerianPhone(body.phone ?? "", body.countryCode ?? "+234");

    if (!/^234\d{10}$/.test(number)) {
      return NextResponse.json({ ok: false, error: "Enter a valid Nigerian phone number." }, { status: 400 });
    }

    const result = await forgotPassword({ phone_number: number });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: extractError(result.data) }, { status: result.status });
    }

    return NextResponse.json({ ok: true, message: 'If this number is registered, you will receive a PIN reset SMS.' });
  } catch {
    return NextResponse.json({ ok: false, error: "Network error. Please try again." }, { status: 500 });
  }
}
