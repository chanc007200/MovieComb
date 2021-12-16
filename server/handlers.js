"use strict";

const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getWatchList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { userId } = req.params;
  console.log("da", userId);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const result = await db
      .collection("Users")
      .find({ name: userId })
      .toArray();
    console.log(result);
    result
      ? res.status(200).json({ status: 200, data: result[0].watchlist })
      : res.status(404).json({ status: 404, data: "WatchList not found" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const addToWatchList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  console.log("blah", req.body);
  let result = null;
  try {
    await client.connect();
    const db = client.db("MovieComb");

    if (req.body.tvObject) {
      result = await db
        .collection("Users")
        .updateOne(
          { name: req.body.userSignedIn },
          { $push: { watchlist: req.body.tvObject } }
        );
    } else if (req.body.movieObject) {
      result = await db
        .collection("Users")
        .updateOne(
          { name: req.body.userSignedIn },
          { $push: { watchlist: req.body.movieObject } }
        );
    }

    result
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, data: "could not add" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const removeFromWatchList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  let checkWatchList = null;
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const result = await db
      .collection("Users")
      .find({ name: req.body.userSignedIn })
      .toArray();
    console.log("result", result);

    if (result.length > 0) {
      if (req.body.tvObject) {
        checkWatchList = result[0].watchlist.find((movietv) => {
          return movietv._id === req.body.tvObject._id;
        });
      }
      if (req.body.movieObject) {
        checkWatchList = result[0].watchlist.find((movietv) => {
          return movietv._id === req.body.movieObject._id;
        });
      }
      console.log("hey", checkWatchList);
      if (checkWatchList) {
        await db.collection("Users").updateOne(
          { name: req.body.userSignedIn },
          {
            $pull: {
              watchlist: { _id: checkWatchList._id },
            },
          }
        );
        return res.status(200).json({ status: 200, data: "deleted" });
      }
      return res.status(204).json({
        status: 204,
        data: "couldn't find movie/tv in user's watchlist to delete from",
      });
    } else {
      return res.status(204).json({ status: 204, data: "couldn't find user" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
const getInitialSetup = async (req, res) => {
  let result = [];
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const randomMovies = await db
      .collection("Top100Movies")
      .aggregate([{ $sample: { size: 50 } }])
      .toArray();
    const randomTvShows = await db
      .collection("Top100TvShows")
      .aggregate([{ $sample: { size: 50 } }])
      .toArray();
    if (randomMovies && randomTvShows) {
      result.push(randomTvShows, randomMovies);
      return res.status(200).json({ status: 200, data: result });
    } else {
      return res
        .status(404)
        .json({ status: 400, data: "Could not get initial setup" });
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getMovieById = async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");

    const searchTop100 = await db
      .collection("Top100Movies")
      .find({ _id: movieId })
      .toArray();

    if (searchTop100.length > 0) {
      return res.status(200).json({ status: 200, data: searchTop100 });
    } else {
      console.log("fetching api here");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getTvById = async (req, res) => {
  const { tvId } = req.params;
  console.log(tvId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");

    const searchTop100 = await db
      .collection("Top100TvShows")
      .find({ _id: tvId })
      .toArray();

    if (searchTop100.length > 0) {
      return res.status(200).json({ status: 200, data: searchTop100 });
    } else {
      console.log("fetching api here");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getTvByIdPlot = async (req, res) => {
  const { tvId } = req.params;
  console.log(tvId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const searchPlot = await db
      .collection("Top100TvShowsPlots")
      .find({ _id: tvId })
      .toArray();

    if (searchPlot.length > 0) {
      return res.status(200).json({ status: 200, data: searchPlot });
    } else {
      console.log("fetching api here");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
const getTvByIdRecommendedList = async (req, res) => {
  const { tvId } = req.params;
  console.log(tvId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const recommendedList = await db
      .collection("Top100TvShowsRecommendedList")
      .find({ _id: tvId })
      .toArray();
    console.log(recommendedList);
    recommendedList.length > 0
      ? res.status(200).json({ status: 200, data: recommendedList })
      : res.status(404).json({ status: 404, data: "No recommended List" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};
const getMovieByIdRecommendedList = async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const recommendedList = await db
      .collection("Top100MoviesRecommendedList")
      .find({ _id: movieId })
      .toArray();

    // recommendedList[0].recommendedMovies.map((movieString)=>{
    //   const slicedString = movieString.slice(7,)
    // })
    const searchTop100 = await db
      .collection("Top100Movies")
      .find({ _id: movieId })
      .toArray();

    if (searchTop100.length > 0) {
      return res.status(200).json({ status: 200, data: searchTop100 });
    } else {
      console.log("fetching api here");
    }
    console.log(recommendedList);
    recommendedList.length > 0
      ? res.status(200).json({ status: 200, data: recommendedList })
      : res.status(404).json({ status: 404, data: "No recommended List" });
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const getMovieByIdPlot = async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const searchPlot = await db
      .collection("Top100MoviesPlots")
      .find({ _id: movieId })
      .toArray();

    if (searchPlot.length > 0) {
      return res.status(200).json({ status: 200, data: searchPlot });
    } else {
      console.log("fetching api here");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
};

const createUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("MovieComb");
    const checkExistence = await db
      .collection("Users")
      .find({ name: req.body.userName })
      .toArray();
    if (checkExistence) {
      const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);
      const user = {
        name: req.body.userName,
        password: hashedPassword,
        watchlist: [],
      };

      await db.collection("Users").insertOne(user);

      return res.status(201).json({ status: 201, data: req.body.userName });
    } else if (checkExistence) {
      return res
        .status(401)
        .json({ status: 409, data: "User name already exists" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, data: "Could not sign up" });
  } finally {
    client.close();
  }
};

const loginUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const checkUserName = req.body.userName;

  try {
    await client.connect();
    const db = client.db("MovieComb");
    const findUser = await db
      .collection("Users")
      .findOne({ name: checkUserName });
    console.log(findUser);
    console.log(typeof findUser);
    if (!findUser) {
      return res.status(400).json({ status: 400, data: "Cannot find user" });
    }
    if (await bcrypt.compare(req.body.userPassword, findUser.password)) {
      return res.status(201).json({ status: 201, data: findUser.name });
    } else {
      return res
        .status(401)
        .json({ status: 401, data: "Password doesn't match" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: 500, data: "Could not sign in" });
  } finally {
    client.close();
  }
};
module.exports = {
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
  removeFromWatchList,
};
