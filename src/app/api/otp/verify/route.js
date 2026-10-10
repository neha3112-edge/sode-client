import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/config/api";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, otp } = body || {};

    if (!phone || !otp) {
      return NextResponse.json(
        { success: false, message: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);

    // Call backend OTP verify service
    const targetUrl = `${API_BASE_URL}otp/verify`;
    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: cleanPhone, otp }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[OTP Verify Route Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to verify OTP" },
      { status: 500 }
    );
  }
}
