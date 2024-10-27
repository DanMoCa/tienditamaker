import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { readStoreDomain } from "./utils/actions/store/read-store-domain";
import { verifyUserType } from "./utils/actions/session/user";

// Define las rutas protegidas que requieren autenticación
const protectedRoutes = ["/dashboard(.*)"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Obtener el hostname (e.g., 'tienditamaker.com', 'store.tienditamaker.com')
  const hostname = req.headers.get("host");

  // Verificar rutas protegidas primero
  if (protectedRoutes.some((route) => pathname.match(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const userType = (await verifyUserType(token.email as string))[0]
        .userType;
      if (userType === "free") {
        return NextResponse.redirect(new URL("/upgrade", req.url));
      }
    } catch (error) {
      console.error("Error verifying user type:", error);
      return NextResponse.next();
    }
  }

  // Procesar el hostname actual
  let currentHost;
  if (process.env.NODE_ENV === "production") {
    const baseDomain = "tienditamaker.com";
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    currentHost = hostname?.split(":")[0].replace(".localhost", "");
  }

  // Si no hay currentHost o es el dominio principal, continuar normalmente
  if (
    !currentHost ||
    currentHost === "tienditamaker" ||
    currentHost === "localhost"
  ) {
    return NextResponse.next();
  }

  // Buscar la tienda basada en el hostname
  const response = await readStoreDomain(currentHost);

  // Si no se encuentra la tienda, continuar al siguiente middleware
  if (!response || !response.length) {
    return NextResponse.next();
  }

  const tenantSubdomain = response[0].subdomain;

  console.log({
    hostname,
    currentHost,
    tenantSubdomain,
    pathname,
  });

  if (tenantSubdomain) {
    // Reescribir la URL para la tienda específica
    return NextResponse.rewrite(
      new URL(`/${tenantSubdomain}${pathname}`, req.url)
    );
  }

  // Si no hay dominio para reescribir, continuar al siguiente middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
