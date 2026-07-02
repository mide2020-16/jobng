import { NextResponse } from "next/server";
import { normalizeNigerianPhone } from "@/lib/phone";
import { updatePassword } from "@/lib/justjobApi";

export interface confirmBodyData {
  number: string;
  countryCode?: string;
  pin: string;
  confirm_pin: string; 
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as confirmBodyData;
    
    // 1. Sanitize and Format Inputs
    const number = normalizeNigerianPhone(body.number, body.countryCode);
    const pin = body.pin?.trim();
    const confirm_pin = body.confirm_pin?.trim();

    console.log("Sanitized Payload:", { number, pin, confirm_pin });

    // 2. Basic Validation
    if (!number || !pin || !confirm_pin) {
      return NextResponse.json(
        { error: "Missing required fields: phone, pin, or confirm_pin." },
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
    
    // 3. Call External API (AWAIT the promise)
    const result = await updatePassword({
      number,
      pin,
      confirm_pin
    });

    // 4. Handle External API Errors
    if (!result.ok) {
      // Check specifically for your exact OTP string
      if (result.message) {
        return NextResponse.json(
          { message: result.message },
          { status: result.status || 400 }
        );
      }

      // Handle any other errors the external API might throw
      return NextResponse.json(
        { error: result.message || "Failed to update PIN via external service." },
        { status: result.status }
      );
    }

    // 5. Success Response (200 OK)
    return NextResponse.json(
      { message: result.message || "PIN successfully updated." },
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