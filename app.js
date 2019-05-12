const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");

const app = express();

// Make request body available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));
