-- CreateTable
CREATE TABLE "review_reactions" (
    "review_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reaction" SMALLINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "review_reactions_pkey" PRIMARY KEY ("review_id","user_id")
);

-- AddForeignKey
ALTER TABLE "review_reactions" ADD CONSTRAINT "review_reactions_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "FlossReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_reactions" ADD CONSTRAINT "review_reactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
