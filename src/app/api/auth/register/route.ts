import { NextResponse } from "next/server";
import { createUser, extractError } from "@/lib/justjobApi";
import { normalizeNigerianPhone } from "@/lib/phone";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      phone?: string;
      pin?: string;
      confirmPin?: string;
      countryCode?: string;
    };
    const number = normalizeNigerianPhone(body.phone ?? "", body.countryCode ?? "+234");
    const pin = (body.pin ?? "").trim();
    const confirmPin = (body.confirmPin ?? "").trim();

    if (!/^234\d{10}$/.test(number)) {
      return NextResponse.json({ ok: false, error: "Enter a valid Nigerian phone number." }, { status: 400 });
    }
    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json({ ok: false, error: "PIN must be 4 to 6 digits." }, { status: 400 });
    }
    if (pin !== confirmPin) {
      return NextResponse.json({ ok: false, error: "PINs do not match." }, { status: 400 });
    }

    const result = await createUser({ number, pin, confirm_pin: confirmPin });
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: extractError(result.data) }, { status: result.status });
    }

    return NextResponse.json({ ok: true, message: "Account created. You can now sign in." });
  } catch {
    return NextResponse.json({ ok: false, error: "Network error. Please try again." }, { status: 500 });
  }
}
