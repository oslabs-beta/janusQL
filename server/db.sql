CREATE DATABASE janusQL;

CREATE TABLE users_table(
  _id serial PRIMARY KEY,
  username varchar UNIQUE NOT NULL,
  fullname varchar NOT NULL,
  "password" varchar NOT NULL,
  email varchar UNIQUE NOT NULL,
)