"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGenres = async (req, res) => {
  let genres = [];
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const result = await db.collection("Genres").find().toArray();
    result.map((gnr) => {
      genres.push(gnr.genre);
    });
    result
      ? res.status(200).json({ status: 200, data: genres })
      : res.status(404).json({ status: 404, data: "No genres found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getMovie = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const result = await db.collection("testMovie").find().toArray();
    console.log("testMovie", result);
    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, data: "No genres found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

module.exports = { getGenres, getMovie };
