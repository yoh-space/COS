-- CreateTable
CREATE TABLE "Administrator" (
    "id" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT,
    "imagePath" TEXT,
    "accountabilityStatement" TEXT,
    "duties" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Administrator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrator_positionId_key" ON "Administrator"("positionId");
