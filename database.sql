CREATE DATABASE messagePasserDB;
-- \c messagePasserDB # to enter db

CREATE TABLE messages(
  id serial PRIMARY KEY,
  messageBody VARCHAR (1000) NOT NULL
);
