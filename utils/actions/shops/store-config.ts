import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStoreConfigByUser(userId: any) {
  try {
    const store = await prisma.store.findFirst({
      where: { userId },
    });

    return store;
  } catch (error) {
    console.error("Error fetching store config:", error);
    return null;
  }
}

export async function updateStoreConfig(userId: any, config: any) {
  try {
    // Fetch the store ID based on userId first
    const store = await prisma.store.findFirst({
      where: { userId },
    });

    if (!store) {
      console.error("Store not found for userId:", userId);
      return null;
    }

    const updatedStore = await prisma.store.update({
      where: { id: store.id }, // Use store.id instead of userId
      data: config,
    });

    return updatedStore;
  } catch (error) {
    console.error("Error updating store config:", error);
    return null;
  }
}
