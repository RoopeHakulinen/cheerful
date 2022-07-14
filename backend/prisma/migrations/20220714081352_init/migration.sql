-- CreateTable
CREATE TABLE "Carpet"
(
    "id"                 SERIAL       NOT NULL,
    "width"              INTEGER      NOT NULL,
    "height"             INTEGER      NOT NULL,
    "color"              VARCHAR(255) NOT NULL,
    "horizontalSegments" INTEGER      NOT NULL,
    "verticalSegments"   INTEGER      NOT NULL,
    "choreographyId"     INTEGER      NOT NULL,

    CONSTRAINT "Carpet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choreography"
(
    "id"     SERIAL       NOT NULL,
    "name"   VARCHAR(255) NOT NULL,
    "frames" JSON         NOT NULL,
    "teamId" INTEGER      NOT NULL,

    CONSTRAINT "Choreography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoreographyPerson"
(
    "id"             SERIAL       NOT NULL,
    "color"          VARCHAR(255) NOT NULL,
    "personId"       INTEGER      NOT NULL,
    "choreographyId" INTEGER      NOT NULL,

    CONSTRAINT "ChoreographyPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person"
(
    "id"   SERIAL       NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User"
(
    "id"        SERIAL       NOT NULL,
    "firstName" VARCHAR(255),
    "lastName"  VARCHAR(255),
    "email"     VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team"
(
    "id"   SERIAL       NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnTeams"
(
    "userId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnTeams_pkey" PRIMARY KEY ("userId", "teamId")
);

-- CreateTable
CREATE TABLE "ChoreographiesOnTeams"
(
    "choreographyId" INTEGER NOT NULL,
    "teamId"         INTEGER NOT NULL,

    CONSTRAINT "ChoreographiesOnTeams_pkey" PRIMARY KEY ("choreographyId", "teamId")
);

-- CreateTable
CREATE TABLE "_TeamToUser"
(
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Carpet_choreographyId_key" ON "Carpet" ("choreographyId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "_TeamToUser" ("A", "B");

-- CreateIndex
CREATE INDEX "_TeamToUser_B_index" ON "_TeamToUser" ("B");

-- AddForeignKey
ALTER TABLE "Carpet"
    ADD CONSTRAINT "Carpet_choreographyId_fkey" FOREIGN KEY ("choreographyId") REFERENCES "Choreography" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choreography"
    ADD CONSTRAINT "Choreography_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoreographyPerson"
    ADD CONSTRAINT "ChoreographyPerson_choreographyId_fkey" FOREIGN KEY ("choreographyId") REFERENCES "Choreography" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoreographyPerson"
    ADD CONSTRAINT "ChoreographyPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTeams"
    ADD CONSTRAINT "UsersOnTeams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnTeams"
    ADD CONSTRAINT "UsersOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoreographiesOnTeams"
    ADD CONSTRAINT "ChoreographiesOnTeams_choreographyId_fkey" FOREIGN KEY ("choreographyId") REFERENCES "Choreography" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoreographiesOnTeams"
    ADD CONSTRAINT "ChoreographiesOnTeams_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser"
    ADD CONSTRAINT "_TeamToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TeamToUser"
    ADD CONSTRAINT "_TeamToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
