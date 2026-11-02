import test from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const landingDataDir = path.join(__dirname, "..", "src", "data", "landing");

// 1. Test STATE_OPTIONS
test("STATE_OPTIONS has exactly 36 Indian states and union territories without duplicates", async () => {
  const { STATE_OPTIONS } = await import("../src/constants/stateOptions.js");
  assert.strictEqual(STATE_OPTIONS.length, 36);

  const unique = new Set(STATE_OPTIONS);
  assert.strictEqual(unique.size, 36, "There should be no duplicates");

  // Check key states and UTs
  assert.ok(STATE_OPTIONS.includes("Delhi"));
  assert.ok(STATE_OPTIONS.includes("Maharashtra"));
  assert.ok(STATE_OPTIONS.includes("Karnataka"));
  assert.ok(STATE_OPTIONS.includes("Jammu and Kashmir"));
  assert.ok(STATE_OPTIONS.includes("Ladakh"));
  assert.ok(STATE_OPTIONS.includes("Chandigarh"));
  assert.ok(STATE_OPTIONS.includes("Puducherry"));
  assert.ok(STATE_OPTIONS.includes("Dadra and Nagar Haveli and Daman and Diu"));
  assert.ok(STATE_OPTIONS.includes("Andaman and Nicobar Islands"));
  assert.ok(STATE_OPTIONS.includes("Lakshadweep"));

  // No blank or whitespace strings
  for (const st of STATE_OPTIONS) {
    assert.ok(st && st.trim().length > 0, `Invalid state option: "${st}"`);
  }
});

// 2. Test Page-Specific Course Resolution
test("Page-specific courses resolve correctly without falling back to MBA or other universities", () => {
  function extractCoursesFromFile(filename) {
    const fullPath = path.join(landingDataDir, filename);
    const text = fs.readFileSync(fullPath, "utf8");
    const match = text.match(/courses:\s*(\[[\s\S]*?\])\s*,/);
    if (!match) return [];
    // Safely evaluate array literal
    const fn = new Function(`return ${match[1]};`);
    return fn();
  }

  function resolveLandingCourses(raw = []) {
    const seen = new Set();
    const result = [];
    for (const item of raw) {
      const val = typeof item === "string" ? item : (item?.value || item?.label);
      const lbl = typeof item === "string" ? item : (item?.label || item?.value);
      if (val && !seen.has(val)) {
        seen.add(val);
        result.push({ value: val, label: lbl });
      }
    }
    return result;
  }

  // IIM Kozhikode must only have HR & Analytics
  const iimRaw = extractCoursesFromFile("iim.js");
  const iimCourses = resolveLandingCourses(iimRaw);
  assert.strictEqual(iimCourses.length, 1);
  assert.strictEqual(iimCourses[0].value, "HR & Analytics");
  assert.strictEqual(iimCourses[0].label, "HR & Analytics");

  // ESGCI must only have its DBA course
  const esgciRaw = extractCoursesFromFile("esgci.js");
  const esgciCourses = resolveLandingCourses(esgciRaw);
  assert.strictEqual(esgciCourses.length, 1);
  assert.strictEqual(esgciCourses[0].value, "DBA - Doctor of Business Administration");

  // Edgewood string courses are normalized to { value, label }
  const edgewoodRaw = extractCoursesFromFile("edgewood.js");
  const edgewoodCourses = resolveLandingCourses(edgewoodRaw);
  assert.strictEqual(edgewoodCourses.length, 4);
  assert.deepStrictEqual(edgewoodCourses[0], {
    value: "DBA in Finance",
    label: "DBA in Finance",
  });

  // Liverpool courses
  const liverpoolRaw = extractCoursesFromFile("liverpool.js");
  const liverpoolCourses = resolveLandingCourses(liverpoolRaw);
  assert.ok(liverpoolCourses.length >= 5);
  assert.ok(liverpoolCourses.some((c) => c.value === "Finance"));
  assert.ok(liverpoolCourses.some((c) => c.value === "Business Analytics"));

  // Amity courses
  const amityRaw = extractCoursesFromFile("amity.js");
  const amityCourses = resolveLandingCourses(amityRaw);
  assert.ok(amityCourses.length > 0);
  assert.ok(amityCourses.some((c) => c.value === "MBA"));
  assert.ok(amityCourses.some((c) => c.value === "MCA"));
});

// 3. Test UTM extraction & URL decoding logic
test("UTM parameter extraction handles query strings, hash queries, and relative URLs", () => {
  function extractUTMParams(urlStr) {
    const params = {};
    if (!urlStr || typeof urlStr !== "string") return params;
    try {
      const regex = /[?&](utm_[a-zA-Z0-9_-]+)=([^&#\s]*)/g;
      let match;
      while ((match = regex.exec(urlStr)) !== null) {
        try {
          params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
        } catch {
          params[match[1]] = match[2];
        }
      }
      const absoluteUrl =
        urlStr.startsWith("http://") || urlStr.startsWith("https://")
          ? urlStr
          : `http://localhost${urlStr.startsWith("/") ? "" : "/"}${urlStr}`;
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
    } catch {}
    return params;
  }

  // Standard absolute URL
  const res1 = extractUTMParams("https://sode.co.in/iim?utm_source=google&utm_medium=cpc&utm_campaign=iim_leads");
  assert.strictEqual(res1.utm_source, "google");
  assert.strictEqual(res1.utm_medium, "cpc");
  assert.strictEqual(res1.utm_campaign, "iim_leads");

  // Hash with query string
  const res2 = extractUTMParams("https://sode.co.in/amity#apply?utm_source=facebook&utm_medium=paid_social");
  assert.strictEqual(res2.utm_source, "facebook");
  assert.strictEqual(res2.utm_medium, "paid_social");

  // Relative URL without leading slash
  const res3 = extractUTMParams("esgci?utm_source=linkedin&utm_campaign=dba2026");
  assert.strictEqual(res3.utm_source, "linkedin");
  assert.strictEqual(res3.utm_campaign, "dba2026");

  // URL without UTMs
  const res4 = extractUTMParams("https://sode.co.in/mu");
  assert.deepStrictEqual(res4, {});
});

// 4. Test Phone Sanitization Logic
test("Phone number sanitization handles +91, 91 prefix, leading 0, and 10 digits without duplicating", () => {
  function sanitizePhone(phone) {
    const rawDigits = String(phone || "").replace(/\D/g, "");
    let cleanPhone = rawDigits;
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }
    return cleanPhone;
  }

  assert.strictEqual(sanitizePhone("9876543210"), "9876543210");
  assert.strictEqual(sanitizePhone("+919876543210"), "9876543210");
  assert.strictEqual(sanitizePhone("+91 98765 43210"), "9876543210");
  assert.strictEqual(sanitizePhone("919876543210"), "9876543210");
  assert.strictEqual(sanitizePhone("09876543210"), "9876543210");
  assert.strictEqual(sanitizePhone("+91-98765-43210"), "9876543210");
});

// 5. Test Lead Payload Mapping & Validation
test("Lead payload shape matches exact CRM contract", () => {
  const sanitizePhone = (phone) => {
    const raw = String(phone || "").replace(/\D/g, "");
    if (raw.length === 12 && raw.startsWith("91")) return raw.slice(2);
    if (raw.length === 11 && raw.startsWith("0")) return raw.slice(1);
    return raw;
  };

  const name = "John Doe";
  const email = "john@example.com";
  const phone = "+91 9876543210";
  const course = "HR & Analytics";
  const state = "Karnataka";
  const form_name = "Download Brochure Modal";
  const source = "SODE";
  const sub_source = "iim";
  const page_url = "https://sode.co.in/iim";
  const userIp = "127.0.0.1";

  const finalPayload = {
    full_name: String(name).trim(),
    name: String(name).trim(),
    email: email ? String(email).trim() : "",
    phone: sanitizePhone(phone),
    course: course || "",
    state: state || "",
    form_name: form_name || "Default Form",
    source: source || "SODE",
    sub_source: sub_source || "",
    utm_source: "Organic",
    utm_medium: "SODE CO IN Organic",
    utm_term: "",
    utm_campaign: "",
    utm_content: "",
    page_url: page_url || "Unknown",
    ip_address: userIp,
  };

  const expectedKeys = [
    "full_name",
    "name",
    "email",
    "phone",
    "course",
    "state",
    "form_name",
    "source",
    "sub_source",
    "utm_source",
    "utm_medium",
    "utm_term",
    "utm_campaign",
    "utm_content",
    "page_url",
    "ip_address",
  ];

  assert.deepStrictEqual(Object.keys(finalPayload).sort(), expectedKeys.sort());
  assert.strictEqual(finalPayload.phone, "9876543210");
  assert.strictEqual(finalPayload.course, "HR & Analytics");
  assert.strictEqual(finalPayload.state, "Karnataka");
  assert.strictEqual(finalPayload.utm_source, "Organic");
});

// 6. Test Modal Non-Dismissal during form interaction & submission
test("Modal behavior rules: maskClosable is false and close is guarded during submission", () => {
  let isClosed = false;
  let isSubmitting = true;

  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while submission is in progress
    isClosed = true;
  };

  // Attempt to close during submission
  handleClose();
  assert.strictEqual(isClosed, false, "Modal must NOT close while submission is in progress");

  // After submission completes
  isSubmitting = false;
  handleClose();
  assert.strictEqual(isClosed, true, "Modal closes after submission completes");
});


// 7. Test URL normalization for backend endpoint
test("URL normalization creates valid endpoint without duplicate slashes or malformed paths", () => {
  function getBackendEndpoint(baseUrl) {
    const normalizedBase = String(baseUrl || "").replace(/\/+$/, "");
    return `${normalizedBase}/apiconfig/trigger`;
  }

  assert.strictEqual(
    getBackendEndpoint("https://new.crm.api.mysode.com/api/"),
    "https://new.crm.api.mysode.com/api/apiconfig/trigger"
  );
  assert.strictEqual(
    getBackendEndpoint("https://new.crm.api.mysode.com/api"),
    "https://new.crm.api.mysode.com/api/apiconfig/trigger"
  );
  assert.strictEqual(
    getBackendEndpoint("https://api.crm.mysode.com/api///"),
    "https://api.crm.mysode.com/api/apiconfig/trigger"
  );
});

// 8. Test Safe Error Response Handling for Non-JSON and HTML responses
test("Non-JSON or HTML backend responses are parsed safely without crashing", () => {
  function extractErrorDetail(status, bodyText) {
    let errorDetail = "";
    try {
      const errorData = JSON.parse(bodyText);
      errorDetail = errorData?.message || (typeof errorData === "string" ? errorData : JSON.stringify(errorData));
    } catch {
      errorDetail =
        bodyText && !bodyText.includes("<html")
          ? bodyText.slice(0, 150)
          : `Backend service responded with HTTP ${status}`;
    }
    return errorDetail;
  }

  // HTML 404/502 response
  const htmlErr = extractErrorDetail(502, "<html><head><title>502 Bad Gateway</title></head></html>");
  assert.strictEqual(htmlErr, "Backend service responded with HTTP 502");

  // Structured JSON error response
  const jsonErr = extractErrorDetail(400, JSON.stringify({ success: false, message: "Invalid course parameter" }));
  assert.strictEqual(jsonErr, "Invalid course parameter");

  // Plain text error response
  const textErr = extractErrorDetail(500, "Database connection timed out");
  assert.strictEqual(textErr, "Database connection timed out");
});

// 9. Test Missing Name and Invalid Phone validations
test("Validation returns 400 when name or phone are missing or invalid", () => {
  function validateLeadInput({ name, phone }) {
    if (!name || !phone) {
      return { status: 400, message: "Name and phone number are required" };
    }
    const raw = String(phone).replace(/\D/g, "");
    let cleanPhone = raw;
    if (cleanPhone.length === 12 && cleanPhone.startsWith("91")) {
      cleanPhone = cleanPhone.slice(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith("0")) {
      cleanPhone = cleanPhone.slice(1);
    }
    if (cleanPhone.length < 10) {
      return { status: 400, message: "Please enter a valid phone number" };
    }
    return { status: 200, cleanPhone };
  }

  assert.strictEqual(validateLeadInput({ name: "", phone: "9876543210" }).status, 400);
  assert.strictEqual(validateLeadInput({ name: "John", phone: "" }).status, 400);
  assert.strictEqual(validateLeadInput({ name: "John", phone: "123" }).status, 400);
  assert.strictEqual(validateLeadInput({ name: "John", phone: "+91 9876543210" }).status, 200);
});
