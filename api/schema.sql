DROP TABLE IF EXISTS aliases;
DROP TABLE IF EXISTS perc_prism;
DROP TABLE IF EXISTS sqlite_sequence;

CREATE TABLE "aliases" (
    "character_name" TEXT UNIQUE,
    "account_name" TEXT
);

CREATE TABLE "perc_prism" (
    "fight_id" INTEGER UNIQUE,
    "modified" INTEGER DEFAULT 0,
    "guild_id" INTEGER,
    "channel_id" INTEGER,
    "date" INTEGER,
    "file_path" TEXT,
    "Sword" TEXT,
    "W1_name" TEXT,
    "W1_class" INTEGER,
    "W1_dead" INTEGER,
    "W2_name" TEXT,
    "W2_class" INTEGER,
    "W2_dead" INTEGER,
    "W3_name" TEXT,
    "W3_class" INTEGER,
    "W3_dead" INTEGER,
    "W4_name" TEXT,
    "W4_class" INTEGER,
    "W4_dead" INTEGER,
    "W5_name" TEXT,
    "W5_class" INTEGER,
    "W5_dead" INTEGER,
    "L1_name" TEXT,
    "L1_class" INTEGER,
    "L1_dead" INTEGER,
    "L2_name" TEXT,
    "L2_class" INTEGER,
    "L2_dead" INTEGER,
    "L3_name" TEXT,
    "L3_class" INTEGER,
    "L3_dead" INTEGER,
    "L4_name" TEXT,
    "L4_class" INTEGER,
    "L4_dead" INTEGER,
    "L5_name" TEXT,
    "L5_class"INTEGER,
    "L5_dead" INTEGER,
    PRIMARY KEY("fight_id" AUTOINCREMENT)
);