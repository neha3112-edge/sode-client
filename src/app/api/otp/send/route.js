import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/config/api";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, purpose } = body || {};

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone number is required" },
        { status: 400 }
      );
    }

    const cleanPhone = String(phone).replace(/\D/g, "").slice(-10);
    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid 10-digit mobile number" },
        { status: 400 }
      );
    }

    // Call backend OTP service
    const targetUrl = `${API_BASE_URL}otp/send`;
    const res = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: cleanPhone, purpose: purpose || "counselling" }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("[OTP Send Route Error]:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
