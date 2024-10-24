// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/config/database";
import User from "@/models/user";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // En Next 13, necesitamos pasar el request completo al getToken
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET, // Asegúrate de tener esto configurado
    });

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await dbConnect();

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Opcionalmente, puedes exportar otros métodos HTTP
export async function HEAD(request: NextRequest) {
  return new NextResponse(null, { status: 200 });
}
