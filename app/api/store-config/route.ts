import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const existingShop = await prisma.store.findFirst({
      where: { subdomain: data.subdomain },
    });
    let shop;

    if (existingShop) {
      shop = await prisma.store.update({
        where: { id: existingShop.id },
        data,
      });
    } else {
      shop = await prisma.store.create({ data });
    }

    return NextResponse.json({ success: true, data: shop });
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { success: false, error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
