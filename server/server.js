"use strict";

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = 8000;

const {
  removeFromWatchList,
  getWatchList,
  getInitialSetup,
  getMovieById,
  getTvById,
  createUsers,
  loginUsers,
  addToWatchList,
  getTvByIdPlot,
  getMovieByIdPlot,
  getTvByIdRecommendedList,
  getMovieByIdRecommendedList,
} = require("./handlers");
express()
  .use(express.json())
  .use(morgan("tiny"))

  .put("/addToWatchList", addToWatchList)
  .get("/watchList/:userId", getWatchList)
  .delete("/removeFromWatchList", removeFromWatchList)

  .get("/getInitialSetup", getInitialSetup)

  .get("/getMovieById/:movieId", getMovieById)
  .get("/getMovieById/plot/:movieId", getMovieByIdPlot)
  .get("/getMovieById/recommendedList/:movieId", getMovieByIdRecommendedList)

  .get("/getTvById/:tvId", getTvById)
  .get("/getTvById/plot/:tvId", getTvByIdPlot)
  .get("/getTvById/recommendedList/:tvId", getTvByIdRecommendedList)

  .post("/users", createUsers)
  .post("/users/login", loginUsers)

  .listen(PORT, function () {
    console.info("🌍 Listening on port " + PORT);
  });
