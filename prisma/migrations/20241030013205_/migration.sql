/*
  Warnings:

  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `ProviderProduct` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isActive";

-- AlterTable
ALTER TABLE "ProviderProduct" DROP COLUMN "isActive";
