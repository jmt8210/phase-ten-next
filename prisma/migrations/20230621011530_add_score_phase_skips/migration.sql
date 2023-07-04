-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "dealer_id" INTEGER NOT NULL,
    "player_turn_id" INTEGER NOT NULL,
    "winner_id" INTEGER,
    "deck" JSONB NOT NULL,
    "discard" JSONB,
    "player_ids" INTEGER[],

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_game_info" (
    "game_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "phase" INTEGER NOT NULL,
    "skips" INTEGER NOT NULL,
    "hand" JSONB,
    "laid_cards" JSONB,
    "taken_card" BOOLEAN NOT NULL,

    CONSTRAINT "player_game_info_pkey" PRIMARY KEY ("game_id","player_id")
);

-- AddForeignKey
ALTER TABLE "player_game_info" ADD CONSTRAINT "fk_game_id" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "player_game_info" ADD CONSTRAINT "fk_player_id" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
