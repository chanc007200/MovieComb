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
  getMovieByIdImages,
  getTvByIdImages,
  getTvByIdGetSeasons,
  getTvByIdUpcoming,
  getMovieByIdUpcoming,
} = require("./handlers");
try {
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
    .get("/getMovieById/images/:movieId", getMovieByIdImages)
    .get("/getMovieById/upcomingMovies", getMovieByIdUpcoming)

    .get("/getTvById/:tvId", getTvById)
    .get("/getTvById/plot/:tvId", getTvByIdPlot)
    .get("/getTvById/recommendedList/:tvId", getTvByIdRecommendedList)
    .get("/getTvById/images/:tvId", getTvByIdImages)
    .get("/getTvById/seasons/:tvId", getTvByIdGetSeasons)
    .get("/getTvById/upcomingTv", getTvByIdUpcoming)

    .post("/users", createUsers)
    .post("/users/login", loginUsers)
    .use(function (err, req, res, next) {
      // logic
      console.log("error handler");

      res.send({ error: true });
    })
    .listen(PORT, function () {
      console.info("🌍 Listening on port " + PORT);
    });
} catch (err) {
  console.log(err);
}
