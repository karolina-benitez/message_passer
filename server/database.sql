CREATE DATABASE messagepasserdb;
-- \c messagepasserdb # to enter db

CREATE TABLE messages(
  id serial PRIMARY KEY,
  messageBody VARCHAR (1000) NOT NULL,
  messageURL VARCHAR (1000) NOT NULL
);
