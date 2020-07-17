CREATE DATABASE messagepasserdb;
-- \c messagepasserdb # to enter db

CREATE TABLE messages(
  id serial PRIMARY KEY,
  messageBody VARCHAR (1000) NOT NULL
);

ALTER TABLE messages ADD COLUMN url varchar(250);