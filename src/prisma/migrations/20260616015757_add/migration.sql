/*
  Warnings:

  - Added the required column `createByUserId` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "createByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_createByUserId_fkey" FOREIGN KEY ("createByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
