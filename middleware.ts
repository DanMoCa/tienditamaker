import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { readStoreDomain } from "./utils/actions/shops/read-store-domain";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const hostname = req.headers.get("host");

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    const baseDomain = process.env.BASE_DOMAIN;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    currentHost = hostname?.replace(".localhost:3000", "");
  }

  if (!currentHost) {
    console.log("No subdomain, serving root domain content");
    return NextResponse.next();
  }

  console.log("Current host:", currentHost);

  const response = await readStoreDomain(currentHost);

  if (!response || !response.length) {
    console.log("Subdomain not found, serving root domain content");
    return NextResponse.next();
  }

  const tenantSubdomain = response[0].subdomain;

  if (tenantSubdomain) {
    return NextResponse.rewrite(new URL(`/${tenantSubdomain}`, req.url));
  }

  // Verifica si el token existe
  if (!token && req.nextUrl.pathname === "/dashboard") {
    // Redirige a la página de inicio si no hay sesión
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.rewrite(
    new URL(tenantSubdomain === "/" ? "" : `tienditamaker.com`, req.url)
  );

  return NextResponse.next(); // Permite continuar con la solicitud
}

// Define las rutas donde se aplicará el middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // Aplica el middleware solo a la ruta /dashboard
};
