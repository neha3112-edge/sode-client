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

    const secondaryCrmUrl = process.env.SECONDARY_CRM_URL;
    const secondaryCrmApiKey = process.env.SECONDARY_CRM_API_KEY;
    const gallaboxWebhookUrl = process.env.GALLABOX_WEBHOOK_URL;
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = Number(process.env.BREVO_LIST_ID) || 217;

    const shouldSubmitToGoogleSheets =
      finalPayload.source === "IIITB LP" ||
      finalPayload.form_name.includes("IIITB") ||
      finalPayload.form_name.includes("Coupon Form") ||
      finalPayload.form_name.includes("Compare University Form");

    /*
    |--------------------------------------------------------------------------
    | Fire all external API calls in PARALLEL (Promise.allSettled)
    | Sequential calls would take ~4s total; parallel takes ~1s
    |--------------------------------------------------------------------------
    */

    const tasks = [];

    /* 1. Secondary CRM */
    if (secondaryCrmUrl && secondaryCrmApiKey) {
      tasks.push(
        fetch(secondaryCrmUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": secondaryCrmApiKey,
          },
          body: JSON.stringify(finalPayload),
          cache: "no-store",
        })
          .then(async (res) => {
            const text = await res.text();
            console.log("Secondary CRM Response:", text);
          })
          .catch((err) =>
            console.error("Failed to send lead to Secondary CRM:", err)
          )
      );
    } else {
      console.warn("SECONDARY_CRM_URL or SECONDARY_CRM_API_KEY missing");
    }

    /* 2. Gallabox */
    if (gallaboxWebhookUrl && gallaboxWebhookUrl !== "your_gallabox_webhook_url_here") {
      tasks.push(
        fetch(gallaboxWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(name).trim(),
            phone: phoneWithPlus,
            email: email || "",
            course: course || "MBA",
            state: state || "",
            source: source || "SODE",
            tags: ["Success"],
            utm_source: finalUtmSource,
            utm_medium: finalUtmMedium,
            utm_campaign: finalUtmCampaign,
            utm_term: finalUtmTerm,
            utm_content: finalUtmContent,
          }),
          cache: "no-store",
        })
          .then(async (res) => {
            if (!res.ok) {
              console.error("Gallabox Webhook error:", await res.text());
            } else {
              console.log("Lead successfully submitted to Gallabox");
            }
          })
          .catch((err) =>
            console.error("Failed to send lead to Gallabox:", err)
          )
      );
    }

    /* 3. Brevo */
    if (brevoApiKey && brevoApiKey !== "your_brevo_api_key_here") {
      tasks.push(
        fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email || undefined,
            listIds: [brevoListId],
            attributes: {
              FULLNAME: String(name).trim(),
              SMS: phoneWithPlus,
              MOBILE: phoneWithPlus,
              COURSES: course || "MBA",
              STATES: state || "",
              UTM_SOURCE: finalUtmSource,
              UTM_CAMPAIGN: finalUtmCampaign,
              UTM_MEDIUM: finalUtmMedium,
              UTM_TERM: finalUtmTerm,
              SOURCE: source || "SODE",
            },
            updateEnabled: true,
          }),
          cache: "no-store",
        })
          .then(async (res) => {
            if (!res.ok) {
              console.error("Brevo API error:", await res.text());
            } else {
              console.log("Lead successfully submitted to Brevo");
            }
          })
          .catch((err) => console.error("Failed to send lead to Brevo:", err))
      );
    }

    /* 4. Google Sheets (conditional) */
    if (shouldSubmitToGoogleSheets) {
      tasks.push(
        fetch(
          "https://script.google.com/macros/s/AKfycbwCXWFhWQAxt0tR-JOK-6cGBK4MjkiDGSYsxUlcVWjlpJeqJKv5V6a0fm7i9EZFeTV7hw/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalPayload),
            cache: "no-store",
          }
        )
          .then(async (res) => {
            if (!res.ok) {
              console.error("Google Sheets error:", await res.text());
            } else {
              console.log("Lead successfully submitted to Google Sheets");
            }
          })
          .catch((err) =>
            console.error("Failed to send lead to Google Sheets:", err)
          )
      );
    }

    /* Wait for all tasks — any failure is logged but won't block response */
    await Promise.allSettled(tasks);

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
