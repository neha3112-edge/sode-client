import { NextResponse } from 'next/server';

let cachedRedirects = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 30 * 1000;

async function getRedirects(backendUrl) {
  const now = Date.now();
  if (cachedRedirects && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedRedirects;
  }

  try {
    const res = await fetch(`${backendUrl}/api/url-redirects/public/all`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return cachedRedirects || [];
    const data = await res.json();
    if (data?.success && Array.isArray(data.result)) {
      cachedRedirects = data.result;
      lastFetchTime = now;
      return cachedRedirects;
    }
  } catch {
    return cachedRedirects || [];
  }
  return cachedRedirects || [];
}

function parseUrlDetails(urlString) {
  const trimmed = String(urlString || '').trim().toLowerCase();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const u = new URL(trimmed);
      const cleanPath = (u.pathname || '/').replace(/\/+$/, '') || '/';
      return {
        hasHost: true,
        host: u.hostname.replace(/^www\./, ''),
        path: cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`,
      };
    } catch {}
  }
  const cleanPath = trimmed.replace(/\/+$/, '') || '/';
  return {
    hasHost: false,
    host: '',
    path: cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`,
  };
}

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_DEV_REMOTE === 'remote' || process.env.NODE_ENV === 'production'
      ? (process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER || 'https://new.crm.api.mysode.com')
      : (process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER || 'http://localhost:3000');

  const redirects = await getRedirects(backendUrl);
  if (!redirects || redirects.length === 0) {
    return NextResponse.next();
  }

  const requestHost = (req.headers.get('host') || req.nextUrl.hostname || '')
    .toLowerCase()
    .split(':')[0]
    .replace(/^www\./, '');

  const requestPath = (pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';

  const matched = redirects.find((r) => {
    if (!r.sourceUrl) return false;
    const redirectSource = parseUrlDetails(r.sourceUrl);

    if (redirectSource.hasHost) {
      if (redirectSource.host !== requestHost) {
        return false;
      }
    }

    return redirectSource.path === requestPath;
  });

  if (!matched) {
    return NextResponse.next();
  }

  fetch(`${backendUrl}/api/url-redirects/public/hit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceUrl: matched.sourceUrl }),
  }).catch(() => {});

  const statusCode = Number(matched.status_code) || 301;

  if (statusCode === 410) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>410 Gone</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>410 - Content Deleted</h1><p>The requested page has been permanently removed.</p></body></html>`,
      {
        status: 410,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      }
    );
  }

  if (statusCode === 451) {
    return new NextResponse(
      `<!DOCTYPE html><html><head><title>451 Unavailable For Legal Reasons</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>451 - Unavailable For Legal Reasons</h1><p>Access to this resource is restricted for legal reasons.</p></body></html>`,
      {
        status: 451,
        headers: { 'content-type': 'text/html; charset=utf-8' },
      }
    );
  }

  if (matched.targetUrl) {
    let target = matched.targetUrl.trim();
    let redirectUrl;

    if (target.startsWith('http://') || target.startsWith('https://')) {
      redirectUrl = new URL(target);
    } else {
      if (!target.startsWith('/')) target = `/${target}`;
      redirectUrl = new URL(target, req.url);
    }

    // Ensure trailing slash for internal routes because next.config.mjs has trailingSlash: true
    if (!target.startsWith('http://') && !target.startsWith('https://')) {
      if (!redirectUrl.pathname.endsWith('/') && !redirectUrl.pathname.includes('.')) {
        redirectUrl.pathname = `${redirectUrl.pathname}/`;
      }
    }

    // Guard against infinite redirect loops (if target path matches current path)
    const matchedSource = parseUrlDetails(matched.sourceUrl);
    const targetPath = (redirectUrl.pathname || '/').toLowerCase().replace(/\/+$/, '') || '/';
    const targetHost = (redirectUrl.hostname || '').toLowerCase().replace(/^www\./, '');
    if (targetPath === requestPath && (!matchedSource.hasHost || targetHost === requestHost)) {
      return NextResponse.next();
    }

    if (req.nextUrl.search) {
      const existingParams = new URLSearchParams(req.nextUrl.search);
      for (const [key, value] of existingParams.entries()) {
        redirectUrl.searchParams.set(key, value);
      }
    }

    return NextResponse.redirect(redirectUrl, 301);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|media).*)',
  ],
};
