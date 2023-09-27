
   
-- CREATE DATABASE "first-look"


-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "child" (
    ID SERIAL PRIMARY KEY NOT NULL,
    userId INT REFERENCES "user" (Id) NOT NULL,
    first VARCHAR(50) NOT NULL,
    middle VARCHAR(50) NULL,
    last VARCHAR(50) NOT NULL,
    birthday DATE NOT NULL,
    hour INT NULL,
    min INT NULL,
    gender VARCHAR(1) NULL
);
INSERT INTO "child" (userId, first, middle, last, birthday, hour, min, gender)
VALUES (1, 'Layla', null, 'Ludkey-Saidov', '2023-11-14', 20, 32, 'F');


create table "timeline" (
    ID SERIAL PRIMARY KEY NOT NULL,
    userId INT REFERENCES "user" (Id) NOT NULL,
	childId INT REFERENCES "child" (Id) NOT NULL,
	eventSum varchar(250),
	dateOf date,
	summary text	
);

INSERT INTO timeline (userId, childId, eventSum, dateOf, summary)
values (1, 1, 'First night home', '2023-11-16', 'Layla was brought home and spent the first night at her new home.');

select * from "user";
select * from "child";
select * from "timeline";