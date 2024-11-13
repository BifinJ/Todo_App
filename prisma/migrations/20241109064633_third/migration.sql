/*
  Warnings:

  - Added the required column `priority` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Made the column `dueDate` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "priority" TEXT NOT NULL,
ALTER COLUMN "dueDate" SET NOT NULL;
