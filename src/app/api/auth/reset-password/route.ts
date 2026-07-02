import { NextResponse } from "next/server";
import { resetPassword, extractError } from "@/lib/justjobApi";
import { normalizeNigerianPhone } from "@/lib/phone";

export interface requestBodyData {
  phone: string | '';
  pin: string | '';
  countryCode?: string | '+234'; 
}
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as requestBodyData;
    const number = normalizeNigerianPhone(body.phone ?? "", body.countryCode ?? "+234");
    const pin = (body.pin ?? "").trim();

    if (!/^234\d{10}$/.test(number)) {
      return NextResponse.json({ ok: false, error: "Enter a valid Nigerian phone number." }, { status: 400 });
    }
    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json({ ok: false, error: "PIN must be exactly 4 digits." }, { status: 400 });
    }

    const result = await resetPassword({ phone_number: number, pin: pin });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: extractError(result.data) }, { status: result.status });
    }

    return NextResponse.json({ ok: true, message: 'PIN reset successfully.' });
  } catch {
    return NextResponse.json({ ok: false, error: "Network error. Please try again." }, { status: 500 });
  }
}