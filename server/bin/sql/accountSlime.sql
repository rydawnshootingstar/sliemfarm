CREATE TABLE accountSlime(
    "accountId"     INTEGER REFERENCES account(id),
    "slimeId"       INTEGER REFERENCES slime(id),
    PRIMARY KEY     ("accountId", "slimeId")
);