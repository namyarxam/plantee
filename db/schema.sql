DROP TABLE IF EXISTS users;

-- Creates standard users table for UserAuth
CREATE TABLE users (
  user_id SERIAL UNIQUE PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT
);


CREATE TABLE plantee (
  plantee_id SERIAL UNIQUE PRIMARY KEY,
  plantee_pic VARCHAR(255),
  plantee_hp INT NOT NULL
);

CREATE TABLE gardeners (
  gardeners_id SERIAL UNIQUE PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone INT NOT NULL
);

CREATE TABLE messages (
  message_id SERIAL UNIQUE PRIMARY KEY,
  body TEXT
);

CREATE TABLE users_plantee (
  user_id REFERENCES users(user_id),
  plantee_id REFERENCES plantee(plantee_id)
);

CREATE TABLE plantee_messages (
  plantee_id REFERENCES plantee(plantee_id),
  message_id REFERENCES messages(message_id)
);

CREATE TABLE plantee_gardeners(
  plantee_gardeners_id REFERENCES plantee(plantee_id),
  plantee_id REFERENCES plantee(plantee_id)
);
