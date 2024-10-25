import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserIdByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user?.id as number;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
}

export async function getUserDataByEmail(email: any) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
