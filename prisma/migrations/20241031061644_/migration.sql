-- CreateTable
CREATE TABLE "Shipping" (
    "id" SERIAL NOT NULL,
    "cartItems" JSONB NOT NULL,
    "address" JSONB NOT NULL,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shipping" ADD CONSTRAINT "Shipping_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
