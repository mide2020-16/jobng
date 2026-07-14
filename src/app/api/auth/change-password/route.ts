import { NextResponse } from "next/server";
import { normalizeNigerianPhone } from "@/lib/phone";
import { changePassword, extractError } from "@/lib/justjobApi";

export interface ChangePasswordBody {
  number: string;
  countryCode?: string;
  old_pin: string;
  pin: string;
  confirm_pin: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChangePasswordBody;

    const number = normalizeNigerianPhone(body.number, body.countryCode);
    const old_pin = body.old_pin?.trim();
    const pin = body.pin?.trim();
    const confirm_pin = body.confirm_pin?.trim();

    if (!number || !old_pin || !pin || !confirm_pin) {
      return NextResponse.json(
        { error: "Missing required fields: phone, old_pin, pin, or confirm_pin." },
        { status: 400 }
      );
    }

    if (pin !== confirm_pin) {
      return NextResponse.json(
        { error: "The provided PINs do not match." },
        { status: 400 }
      );
    }

    if (pin.length < 4) {
      return NextResponse.json(
        { error: "PIN must be at least 4 digits." },
        { status: 400 }
      );
    }

    if (pin === old_pin) {
      return NextResponse.json(
        { error: "New PIN must be different from your current PIN." },
        { status: 400 }
      );
    }

    const result = await changePassword({
      new_pin: pin,
      old_pin,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: extractError(result.data) },
        { status: result.status || 400 }
      );
    }

    return NextResponse.json(
      { message: "PIN successfully updated." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change Password Proxy Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while communicating with the server." },
      { status: 500 }
    );
  }
}
