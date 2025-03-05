-- CreateTable
CREATE TABLE "Prompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prompts" ADD CONSTRAINT "Prompts_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
