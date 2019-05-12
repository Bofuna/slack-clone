const { Pool } = require("pg");

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "slack",
  password: "password",
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
