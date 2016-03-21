DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gardeners CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users_messages CASCADE;
DROP TABLE IF EXISTS users_gardeners CASCADE;

-- Creates standard users table for UserAuth
CREATE TABLE users (
  user_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT NOT NULL,
  phone VARCHAR(15),
  plantee_hp INT DEFAULT 100
);

CREATE TABLE gardeners (
  gardener_id SERIAL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(15)
);

CREATE TABLE messages (
  message_id SERIAL UNIQUE PRIMARY KEY,
  body TEXT
);

CREATE TABLE users_messages (
  user_id INT REFERENCES users(user_id),
  message_id INT REFERENCES messages(message_id)
);

CREATE TABLE users_gardeners (
  gardener_id INT REFERENCES gardeners(gardener_id),
  user_id INT REFERENCES users(user_id)
);
