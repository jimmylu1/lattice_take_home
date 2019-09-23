const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { key } = require("./config.js");

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
