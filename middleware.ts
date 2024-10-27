import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { readStoreDomain } from "./utils/actions/store/read-store-domain";
import { verifyUserType } from "./utils/actions/session/user";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get("host");
  const isDevelopment = process.env.NODE_ENV === "development";

  // Configuración de dominios
  const baseDomain = isDevelopment ? "localhost:3000" : "tienditamaker.com";

  console.log("Original hostname:", hostname);
  console.log("Original pathname:", pathname);
  console.log("Base domain:", baseDomain);

  // Primero, manejar rutas protegidas del dashboard
  if (pathname.startsWith("/dashboard")) {
    console.log("Checking authentication for dashboard access");

    if (!token) {
      console.log("No token found, redirecting to login");
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      const userType = (await verifyUserType(token.email as string))[0]
        .userType;
      console.log("User type:", userType);

      if (userType === "free") {
        console.log(
          "Free user attempting to access dashboard, redirecting to upgrade"
        );
        return NextResponse.redirect(new URL("/upgrade", req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Error verifying user type:", error);
      return NextResponse.next();
    }
  }

  // Lista de rutas del sistema que siempre deben pasar directamente
  const systemRoutes = [
    "api",
    "_next",
    "favicon.ico",
    "upgrade",
    "login",
    "register",
    "dashboard",
  ];

  // Verificar si es una ruta del sistema
  const firstSegment = pathname.split("/")[1];
  if (systemRoutes.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Procesar subdominios
  if (hostname !== baseDomain) {
    let currentHost;
    if (isDevelopment) {
      currentHost = hostname?.replace(".localhost:3000", "");
    } else {
      currentHost = hostname?.replace(".tienditamaker.com", "");
    }

    console.log("Processing subdomain:", currentHost);

    // Si después de procesar es el mismo que el hostname original,
    // significa que no hay subdominio válido
    if (currentHost === hostname) {
      console.log("Invalid subdomain");
      return NextResponse.next();
    }

    // Verificar si existe la tienda para el subdominio
    const response = await readStoreDomain(currentHost!);

    if (!response || !response.length) {
      console.log("No store found for subdomain:", currentHost);
      return NextResponse.redirect(new URL("/", `https://${baseDomain}`));
    }

    const tenantSubdomain = response[0].subdomain;
    console.log("Rewriting URL for subdomain:", tenantSubdomain);
    return NextResponse.rewrite(
      new URL(`/${tenantSubdomain}${pathname}`, req.url)
    );
  }

  // Para el dominio principal, procesar posibles rutas de tienda
  if (pathname !== "/" && !pathname.startsWith("/_next")) {
    const storePathMatch = pathname.match(/^\/([^\/]+)(\/.*)?$/);
    if (storePathMatch) {
      const potentialStore = storePathMatch[1];

      if (!systemRoutes.includes(potentialStore)) {
        console.log("Checking store path:", potentialStore);

        // Verificar si la tienda existe
        const response = await readStoreDomain(potentialStore);

        if (response && response.length > 0) {
          console.log("Store found:", potentialStore);
          const remainingPath = storePathMatch[2] || "";
          return NextResponse.rewrite(
            new URL(`/${potentialStore}${remainingPath}`, req.url)
          );
        }
      }
    }
  }

  // Si no es ninguno de los casos anteriores, continuar normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
