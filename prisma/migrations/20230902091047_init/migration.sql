/*
  Warnings:

  - The primary key for the `IntuitionBotMsgForTmr` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "IntuitionBotMsgForTmr" DROP CONSTRAINT "IntuitionBotMsgForTmr_pkey",
ALTER COLUMN "msgId" SET DATA TYPE TEXT,
ADD CONSTRAINT "IntuitionBotMsgForTmr_pkey" PRIMARY KEY ("msgId");
