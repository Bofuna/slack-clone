const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../db");

const validateRegisterInput = require("../../validation/register");

const router = express.Router();

router.post("/register", (req, res) => {
  // Validate the user's input.
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { name, email, password } = req.body;

  // Check to make sure nobody has already registered with the given email or name.
  db.query("SELECT * FROM users WHERE name = $1 OR email = $2", [name, email])
    .then(users => {
      if (users.rows.length > 0) {
        // Check if the username already exists.
        const nameExists =
          users.rows.findIndex(user => user.name === name) > -1;
        // Check if a user with the given email already exists.
        const emailExists =
          users.rows.findIndex(user => user.email === email) > -1;
        // If the username already exists set the error message for the name field.
        if (nameExists) {
          errors.name = "Username already exists";
        }
        // If the user with the given email already exists set the error message for the email field.
        if (emailExists) {
          errors.email = "User with the given email address already exists";
        }
        // Send the error response to the client.
        return res.status(400).json(errors);
      } else {
        // Otherwise create a new user.
        // Encrypt the password.
        bcrypt.hash(password, 10, (err, hash) => {
          // Throw an error, if there are any complication in the encyrption process.
          if (err) throw err;

          // Insert a new user into the database.
          db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, hash]
          )
            .then(() => res.json({ msg: "Successfully new user created" }))
            .catch(err => {
              errors.server = "Server Side Error. Please Try Again Later.";
              res.status(500).json(errors);
            });
        });
      }
    })
    .catch(err => {
      errors.server = "Server Side Error. Please Try Again Later.";
      res.status(500).json(errors);
    });
});

module.exports = router;
