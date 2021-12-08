// const { MongoClient } = require("mongodb");
// //import React from "react";
// const fetch = require("cross-fetch");

// require("dotenv").config();
// const { MONGO_URI } = process.env;
// const { REACT_APP_API_KEY } = process.env;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// const fetchGenres = async () => {
//   let MovieArray = [];
//   try {
//     await fetch(
//       "https://imdb8.p.rapidapi.com/title/get-meta-data?ids=tt11126994",
//       {
//         method: "GET",
//         headers: {
//           "x-rapidapi-host": "imdb8.p.rapidapi.com",
//           "x-rapidapi-key": REACT_APP_API_KEY,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         //   console.log(data);
//         MovieArray.push(data);
//         console.log("MovieArray", MovieArray);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//     //console.log(genreArray);
//     // return genreArray.map((gnr) => {
//     //   return { genre: gnr.description };
//     // });
//     return MovieArray;
//   } catch (err) {
//     console.log("err", err.stack);
//   }
//   //    const body = await response.json();
//   //    console.log(body);
// };

// const batchImport = async () => {
//   const client = new MongoClient(MONGO_URI, options);
//   const mongoGenresArray = await fetchGenres();
//   console.log(mongoGenresArray);
//   try {
//     await client.connect();
//     const db = client.db("MovieComb");
//     await db.collection("testMovie").insertMany(mongoGenresArray);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     client.close();
//   }
// };

// batchImport();
