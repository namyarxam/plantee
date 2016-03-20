DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;


-- Creates standard users table for UserAuth
CREATE TABLE users (
  user_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT
);


CREATE TABLE friends (
  friend_id SERIAL PRIMARY KEY UNIQUE,
  friend_name VARCHAR(50),
  phone_number text,
  completed BOOLEAN not null default false
);
