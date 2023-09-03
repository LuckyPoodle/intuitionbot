-- CreateTable
CREATE TABLE "IntuitionBotUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "timezone" INTEGER NOT NULL DEFAULT 8,

    CONSTRAINT "IntuitionBotUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntuitionBotMsgForTmr" (
    "msgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "msg" TEXT NOT NULL,

    CONSTRAINT "IntuitionBotMsgForTmr_pkey" PRIMARY KEY ("msgId")
);

-- CreateIndex
CREATE UNIQUE INDEX "IntuitionBotUser_username_key" ON "IntuitionBotUser"("username");

-- AddForeignKey
ALTER TABLE "IntuitionBotMsgForTmr" ADD CONSTRAINT "IntuitionBotMsgForTmr_userId_fkey" FOREIGN KEY ("userId") REFERENCES "IntuitionBotUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
