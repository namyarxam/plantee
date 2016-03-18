DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gardener CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS users_messages CASCADE;
DROP TABLE IF EXISTS plantee_gardener CASCADE;

-- Creates standard users table for UserAuth
CREATE TABLE users (
  user_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT NOT NULL,
  phone VARCHAR(20),
  plantee_hp INT DEFAULT 100 
);

CREATE TABLE gardeners (
  gardener_id SERIAL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone INT NOT NULL
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
  gardener_id INT REFERENCES gardener(gardener_id),
  user_id INT REFERENCES users(user_id)
);
