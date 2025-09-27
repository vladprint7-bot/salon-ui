import { NextRequest, NextResponse } from "next/server";

// Štiti /admin i pod-rute. Ako u .env.local postoji NEXT_ADMIN_PIN,
// traži PIN i čuva ga u cookie-ju "admin_pin".
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, searchParams } = url;

  // ne zaključavamo samu login stranicu
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const expected = process.env.NEXT_ADMIN_PIN || ""; // čita iz .env.local u vreme builda/dev-a
    if (!expected) return NextResponse.next(); // ako nije setovan PIN, admin je otključan

    const cookiePin = req.cookies.get("admin_pin")?.value || "";
    const queryPin = searchParams.get("pin"); // fallback: /admin?pin=1234

    // Ako je validan pin u query-ju -> postavi cookie i očisti URL
    if (queryPin === expected) {
      const clean = url.clone();
      clean.searchParams.delete("pin");
      const res = NextResponse.redirect(clean);
      res.cookies.set("admin_pin", expected, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dana
        sameSite: "lax",
      });
      return res;
    }

    // Ako cookie nije dobar -> pošalji na login
    if (cookiePin !== expected) {
      const login = url.clone();
      login.pathname = "/admin/login";
      login.searchParams.set("next", pathname + (url.search || ""));
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
