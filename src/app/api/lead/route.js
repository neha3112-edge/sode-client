import { NextResponse } from "next/server";

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
      university,
      university_name,
      state,
      form_name,
      source,
      sub_source,
      utm_source,
      utm_medium,
      utm_term,
      utm_campaign,
      utm_content,
      utm_adgroup,
      gclid,
      page_url,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | Basic validation
    |--------------------------------------------------------------------------
    */

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
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

    const leadName = name ? String(name).trim() : "";
    const resolvedUni = String(university_name || university || "").trim();
    const resolvedState =
      req.headers.get("x-vercel-ip-country-region") ||
      req.headers.get("cf-region") ||
      body.state ||
      body.user_state ||
      state ||
      "";

    const finalPayload = {
      name: leadName,
      email: email ? String(email).trim() : "",
      phone: cleanPhone,
      course: course || "",
      university_name: resolvedUni,
      state: resolvedState,
      form_name: form_name || "Get 100% FREE Counseling",
      source: source || "SODE",
      sub_source: sub_source || "",
      utm_source: finalUtmSource,
      utm_medium: finalUtmMedium,
      utm_term: finalUtmTerm,
      utm_campaign: finalUtmCampaign,
      utm_content: finalUtmContent,
      utm_adgroup: urlParams.utm_adgroup || utm_adgroup || "",
      gclid: urlParams.gclid || gclid || "",
      page_url: page_url || "Unknown",
      ip_address: userIp,
      city: req.headers.get("x-vercel-ip-city") || req.headers.get("cf-ipcity") || body.city || "",
      country: req.headers.get("x-vercel-ip-country") || req.headers.get("cf-ipcountry") || body.country || "India",
    };

    console.log("📥 [LEAD CAPTURED] Payload:", JSON.stringify(finalPayload, null, 2));

    /*
    |--------------------------------------------------------------------------
    | Send to backend CRM Lead API (/api/lead/apicreated)
    |--------------------------------------------------------------------------
    */

    const crmLeadUrl =
      process.env.CRM_LEAD_API_URL ||
      "https://new.crm.api.mysode.com/api/lead/apicreated";
    const crmApiKey =
      process.env.CRM_API_KEY ||
      "a04b4291461f8b060559dfc965864c2c2590e6edd2f5aa7a49388484a1953f22";

    try {
      console.log(`🚀 [CRM API] Sending Lead to ${crmLeadUrl}:`, finalPayload);

      const backendResponse = await fetch(crmLeadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": crmApiKey,
        },
        body: JSON.stringify(finalPayload),
        cache: "no-store",
      });

      const responseText = await backendResponse.text();
      let responseData = null;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }

      if (!backendResponse.ok) {
        console.warn(`⚠️ [CRM Lead API Status ${backendResponse.status}]:`, responseData);
      } else {
        console.log("✅ [CRM Lead API Success]:", responseData);
      }
    } catch (apiErr) {
      console.error("❌ [CRM Lead API Fetch Error]:", apiErr.message);
    }

    /*
    |--------------------------------------------------------------------------
    | Success response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        data: finalPayload,
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
