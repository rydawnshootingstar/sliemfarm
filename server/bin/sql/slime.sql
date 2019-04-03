CREATE TABLE slime(
    id              SERIAL PRIMARY KEY,
    bday            TIMESTAMP NOT NULL,
    nickname        VARCHAR(64),
    "generationId"  INTEGER,
    FOREIGN KEY ("generationId") REFERENCES generation(id) 
);