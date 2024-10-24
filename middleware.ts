import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { hostname } = req.nextUrl;
  const subdomain = hostname.split(".")[0];

  // Verifica si el token existe
  if (!token && req.nextUrl.pathname === "/dashboard") {
    // Redirige a la página de inicio si no hay sesión
    return NextResponse.redirect(new URL("/", req.url));
  }
  req.headers.set("x-subdomain", subdomain);

  return NextResponse.next(); // Permite continuar con la solicitud
}

// Define las rutas donde se aplicará el middleware
export const config = {
  matcher: ["/dashboard"], // Aplica el middleware solo a la ruta /dashboard
};
