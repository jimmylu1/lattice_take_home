const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { key } = require("./config.js");

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Get top 20 trending movies for the week

app.get("/popular", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`
    );
    //If successful, send data
    res.status(200).send({ data: response.data });
  } catch (error) {
    res.status(500).send(error);
  }
});

//Search for movie by movie title
app.get(`/movies/:movieTitle`, async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${req.params.movieTitle}&page=1&include_adult=true`
    );
    //If successful, send data
    res.status(200).send({ data: response.data });
  } catch (error) {
    res.status(500).send(error);
  }
});
