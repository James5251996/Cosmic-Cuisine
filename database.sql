
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
	"avatar" VARCHAR (1000) NOT NULL
);

CREATE TABLE "recipes" (
	"id" SERIAL PRIMARY KEY,
	"image" VARCHAR (255) NOT NULL,
	"title" VARCHAR (255) NOT NULL,
	"ingredients" VARCHAR (1000) NOT NULL,
	"directions" VARCHAR (1000) NOT NULL,
	"category" VARCHAR (100) NOT NULL,
	"user_id" INT REFERENCES "user"
);

INSERT INTO recipes ("image", "title", "ingredients", "directions", "category")
VALUES ('test image', 'test title', 'test ingredients', 'test directions', 'Breakfast'),
	('test image', 'test title', 'test ingredients', 'test directions', 'Entree'),
	('test image', 'test title', 'test ingredients', 'test directions', 'Desert'),
	('test image', 'test title', 'test ingredients', 'test directions', 'Snack'),
	('test image', 'test title', 'test ingredients', 'test directions', 'Drink');