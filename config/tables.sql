-- Link de acesso a modelagem do banco:
-- https://dbdesigner.page.link/sQvjrYBfcS4t8BTY8

-- CREATE DATABASE shortly;

-- CREATE TABLE users (
--     "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
--     "name" TEXT NOT NULL,
--     "email" TEXT NOT NULL UNIQUE,
--     "password" TEXT NOT NULL,
--     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'
-- );

-- CREATE TABLE urls (
--     "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
--     "userId" INTEGER NOT NULL REFERENCES "users"("id"),
--     "url" TEXT NOT NULL,
--     "shortURL" TEXT NOT NULL UNIQUE,
--     "views" INTEGER NOT NULL DEFAULT '0',
--     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'
-- );

-- CREATE TABLE sessions (
--     "id" SERIAL NOT NULL PRIMARY KEY UNIQUE,
--     "userId" INTEGER NOT NULL REFERENCES 'users'("id"),
--     "token" TEXT NOT NULL UNIQUE,
--     "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'NOW()'
-- );