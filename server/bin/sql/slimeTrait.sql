CREATE TABLE slimeTrait(
    "traitId"       INTEGER,
    "slimeId"      INTEGER,
    FOREIGN KEY("traitId") REFERENCES trait(id),
    FOREIGN KEY("slimeId") REFERENCES slime(id)
);