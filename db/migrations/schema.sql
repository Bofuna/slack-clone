CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  owner INTEGER NOT NULL REFERENCES users(id)
);


CREATE TABLE team_members (
  user_id INTEGER REFERENCES users(id),
  team_id INTEGER REFERENCES teams(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(user_id, team_id)
);

CREATE TABLE channels (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  public BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE channel_members (
  user_id INTEGER REFERENCES users(id),
  channel_id INTEGER REFERENCES channels(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  PRIMARY KEY(user_id, channel_id)
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  user_id INTEGER REFERENCES users(id),
  channel_id INTEGER REFERENCES channels(id)
);