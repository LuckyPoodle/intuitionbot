/*
  Warnings:

  - The primary key for the `IntuitionBotMsgForTmr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IntuitionBotUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `msgId` on the `IntuitionBotMsgForTmr` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `IntuitionBotMsgForTmr` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `IntuitionBotUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "IntuitionBotMsgForTmr" DROP CONSTRAINT "IntuitionBotMsgForTmr_userId_fkey";

-- AlterTable
ALTER TABLE "IntuitionBotMsgForTmr" DROP CONSTRAINT "IntuitionBotMsgForTmr_pkey",
DROP COLUMN "msgId",
ADD COLUMN     "msgId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "IntuitionBotMsgForTmr_pkey" PRIMARY KEY ("msgId");

-- AlterTable
ALTER TABLE "IntuitionBotUser" DROP CONSTRAINT "IntuitionBotUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "IntuitionBotUser_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "IntuitionBotMsgForTmr" ADD CONSTRAINT "IntuitionBotMsgForTmr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "IntuitionBotUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
