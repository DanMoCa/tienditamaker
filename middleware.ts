import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { readStoreDomain } from "./utils/actions/store/read-store-domain";
import { verifyUserType } from "./utils/actions/session/user";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get("host");
  const baseDomain =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_DOMAIN
      : "localhost:3000";

  console.log("Original hostname:", hostname);
  console.log("Original pathname:", pathname);

  // Si estamos en localhost:3000, procesar tanto el dashboard como las rutas de tienda
  if (hostname === "localhost:3000") {
    console.log("Main domain (localhost:3000) detected");

    // Check dashboard access
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
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
      } catch (error) {
        console.error("Error verifying user type:", error);
        return NextResponse.next();
      }
    }

    // Procesar rutas de tienda (e.g., /tienda/products/producto1)
    const storePathMatch = pathname.match(/^\/([^\/]+)(\/.*)?$/);
    if (storePathMatch) {
      const potentialStore = storePathMatch[1];
      // Excluir rutas del sistema
      const systemRoutes = [
        "api",
        "_next",
        "favicon.ico",
        "dashboard",
        "upgrade",
        "login",
        "register",
      ];

      if (!systemRoutes.includes(potentialStore)) {
        console.log("Potential store path detected:", potentialStore);

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

    return NextResponse.next();
  }

  // Procesar subdominio
  const currentHost = hostname?.replace(
    process.env.NODE_ENV === "production"
      ? `.${baseDomain}`
      : ".localhost:3000",
    ""
  );

  console.log("Current host after processing:", currentHost);

  if (currentHost === hostname) {
    console.log("No subdomain detected");
    return NextResponse.next();
  }

  // Handle subdomain requests
  const response = await readStoreDomain(currentHost!);

  if (!response || !response.length) {
    console.log("No store found for subdomain:", currentHost);
    return NextResponse.next();
  }

  const tenantSubdomain = response[0].subdomain;

  if (tenantSubdomain) {
    console.log("Rewriting URL for subdomain:", tenantSubdomain);
    const finalPath = pathname === "/" ? "" : pathname;
    return NextResponse.rewrite(
      new URL(`/${tenantSubdomain}${finalPath}`, req.url)
    );
  }

  return NextResponse.rewrite(
    new URL(tenantSubdomain === "/" ? "" : `tienditamaker.com`, req.url)
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
