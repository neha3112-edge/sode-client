import { NextResponse } from "next/server";
import { API_BASE_URL } from "@/config/api";

/*
|--------------------------------------------------------------------------
| Extract UTM parameters from URL
|--------------------------------------------------------------------------
*/

function extractUTMParams(urlStr) {
  const params = {};

  if (!urlStr) {
    return params;
  }

  try {
    const regex = /[?&](utm_[a-zA-Z0-9_-]+)=([^&#\s]*)/g;
    let match;

    while ((match = regex.exec(urlStr)) !== null) {
      try {
        const key = decodeURIComponent(match[1]);
        const value = decodeURIComponent(match[2]);
        params[key] = value;
      } catch {
        params[match[1]] = match[2];
      }
    }

    const absoluteUrl = urlStr.startsWith("http")
      ? urlStr
      : `http://localhost${urlStr}`;

    const parsedUrl = new URL(absoluteUrl);

    parsedUrl.searchParams.forEach((value, key) => {
      if (key.startsWith("utm_") && !params[key]) {
        params[key] = value;
      }
    });

    if (parsedUrl.hash && parsedUrl.hash.includes("?")) {
      const hashQueryPart = parsedUrl.hash.split("?")[1];
      const hashSearchParams = new URLSearchParams(hashQueryPart);

      hashSearchParams.forEach((value, key) => {
        if (key.startsWith("utm_") && !params[key]) {
          params[key] = value;
        }
      });
    }
  } catch (error) {
    console.error("Error parsing URL parameters:", error);
  }

  return params;
}

/*
|--------------------------------------------------------------------------
| Lead API Route Handler
|--------------------------------------------------------------------------
*/

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      course,
      state,
      form_name,
      source,
      sub_source,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      page_url,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | Basic validation
    |--------------------------------------------------------------------------
    */

    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and phone number are required",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Clean phone number
    |--------------------------------------------------------------------------
    */

    const cleanPhone = String(phone).replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone number",
        },
        {
          status: 400,
        }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Phone number with country code for Gallabox and Brevo
    |--------------------------------------------------------------------------
    */

    let phoneWithPlus = cleanPhone;

    if (cleanPhone.length === 10) {
      phoneWithPlus = `+91${cleanPhone}`;
    } else {
      phoneWithPlus = `+${cleanPhone}`;
    }

    /*
    |--------------------------------------------------------------------------
    | Extract user IP address from headers
    |--------------------------------------------------------------------------
    */

    const userIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip")?.trim() ||
      "";

    /*
    |--------------------------------------------------------------------------
    | Extract UTM values from page URL
    |--------------------------------------------------------------------------
    */

    const urlParams = page_url ? extractUTMParams(String(page_url)) : {};

    const finalUtmSource = urlParams.utm_source || utm_source || "Organic";

    const finalUtmMedium =
      urlParams.utm_medium || utm_medium || "SODE CO IN Organic";

    const finalUtmCampaign = urlParams.utm_campaign || utm_campaign || "";

    const finalUtmTerm = urlParams.utm_term || utm_term || "";

    const finalUtmContent = urlParams.utm_content || utm_content || "";

    /*
    |--------------------------------------------------------------------------
    | Final lead payload
    |--------------------------------------------------------------------------
    */

    const finalPayload = {
      full_name: String(name).trim(),
      name: String(name).trim(),
      email: email ? String(email).trim() : "",
      phone: cleanPhone,
      course: course || "",
      state: state || "",
      form_name: form_name || "Default Form",
      source: source || "SODE",
      sub_source: sub_source || "",
      utm_source: finalUtmSource,
      utm_medium: finalUtmMedium,
      utm_term: finalUtmTerm,
      utm_campaign: finalUtmCampaign,
      utm_content: finalUtmContent,
      page_url: page_url || "Unknown",
      ip_address: userIp,
    };

    /*
    |--------------------------------------------------------------------------
    | Send to backend ApiConfig Executor
    |--------------------------------------------------------------------------
    */

    const backendEndpoint = `${API_BASE_URL}apiconfig/execute`;

    const backendResponse = await fetch(backendEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "crm_lead_api",
        payload: finalPayload,
      }),
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error("Backend ApiConfig Execution Error:", errorText);
      throw new Error(`Backend error: ${backendResponse.status}`);
    }

    const backendResult = await backendResponse.json();
    console.log("Lead successfully executed via backend apiConfig:", backendResult);

    /*
    |--------------------------------------------------------------------------
    | Success response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Submission failed",
      },
      {
        status: 500,
      }
    );
  }
}
