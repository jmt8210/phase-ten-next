/*
  Warnings:

  - The `deck` column on the `game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `discard` column on the `game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `hand` column on the `player_game_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `laid_cards` column on the `player_game_info` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "game" DROP COLUMN "deck",
ADD COLUMN     "deck" INTEGER[],
DROP COLUMN "discard",
ADD COLUMN     "discard" INTEGER[];

-- AlterTable
ALTER TABLE "player_game_info" DROP COLUMN "hand",
ADD COLUMN     "hand" INTEGER[],
DROP COLUMN "laid_cards",
ADD COLUMN     "laid_cards" INTEGER[];
