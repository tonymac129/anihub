-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "_Follows" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_Follows_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Follows_B_index" ON "_Follows"("B");

-- AddForeignKey
ALTER TABLE "_Follows" ADD CONSTRAINT "_Follows_A_fkey" FOREIGN KEY ("A") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Follows" ADD CONSTRAINT "_Follows_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
