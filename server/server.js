"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = 8000;

const { getGenres, getMovie } = require("./handlers");
express()
  .use(express.json())
  .use(morgan("tiny"))

  .get("/getGenres", getGenres)
  .get("/getMovie", getMovie)

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
