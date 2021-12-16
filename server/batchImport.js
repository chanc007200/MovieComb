// const { MongoClient } = require("mongodb");
// //import React from "react";
// const fetch = require("cross-fetch");

// //const { PopularMovies } = require("./data");
// require("dotenv").config();
// const { MONGO_URI } = process.env;
// const { REACT_APP_API_KEY } = process.env;
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// const PopularMovies = [
//   "tt11214590",
//   "tt10293406",
//   "tt10872600",
//   "tt4244994",
//   "tt4513678",
//   "tt1160419",
//   "tt2953050",
//   "tt7991608",
//   "tt8721424",
//   "tt10838180",
//   "tt9376612",
//   "tt2382320",
//   "tt7097896",
//   "tt13070602",
//   "tt6920084",
//   "tt10187208",
//   "tt9032400",
//   "tt13491110",
//   "tt8310474",
//   "tt9639470",
//   "tt3581652",
//   "tt11271038",
//   "tt12536294",
//   "tt9620288",
//   "tt0097958",
//   ",tt11540284",
//   "tt0099785",
//   "tt7740496",
//   "tt12789558",
//   "tt6264654",
//   "tt11628854",
//   "tt8847712",
//   "tt10752004",
//   "tt15097216",
//   "tt10696784",
//   "tt0314331",
//   "tt14315756",
//   "tt0191326",
//   "tt11012066",
//   "tt3420504",
//   "tt11286314",
//   "tt6467266",
//   "tt0870154",
//   "tt14079374",
//   "tt13024674",
//   "tt0087332",
//   "tt11003218",
//   "tt0319343",
//   "tt0111070",
//   "tt0241527",
//   "tt0087182",
//   "tt3480822",
//   "tt6334354",
//   "tt10886166",
//   "tt0457939",
//   "tt0133093",
//   "tt10023286",
//   "tt6823148",
//   "tt0170016",
//   "tt15005868",
//   "tt6856242",
//   "tt4154796",
//   "tt0145487",
//   "tt0095016",
//   "tt2397461",
//   "tt1877830",
//   "tt0111161",
//   "tt1270797",
//   "tt10739666",
//   "tt0055614",
//   "tt10954652",
//   "tt8946378",
//   "tt10016180",
//   "tt8337158",
//   "tt7504818",
//   "tt12861212",
//   "tt3281548",
//   "tt10986222",
//   "tt9243804",
//   "tt3228774",
//   "tt13079150",
//   "tt0068646",
//   "tt8041270",
//   "tt6751668",
//   "tt10944760",
//   "tt8984572",
//   "tt3774694",
//   "tt0816692",
//   "tt0072869",
//   "tt0104431",
//   "tt13103340",
//   "tt0083564",
//   "tt0413300",
//   "tt11649338",
//   "tt2250912",
//   "tt0993840",
//   "tt0047673",
//   "tt2709692",
//   "tt0085334",
//   "tt0948470",
// ];

// const PopularTvShows = [
//   "tt10160804",
//   "tt7462410",
//   "tt4236770",
//   "tt11126994",
//   "tt7660850",
//   "tt1267295",
//   "tt13655456",
//   "tt6468322",
//   "tt14164730",
//   "tt9735318",
//   "tt5232792",
//   "tt2235759",
//   "tt0944947",
//   "tt11041332",
//   "tt12235718",
//   "tt5180504",
//   "tt0472954",
//   "tt0773262",
//   "tt9174558",
//   "tt10919420",
//   "tt11212276",
//   "tt0436992",
//   "tt10986410",
//   "tt0386676",
//   "tt14635982",
//   "tt7335184",
//   "tt6932244",
//   "tt1520211",
//   "tt0098904",
//   "tt11712058",
//   "tt8388390",
//   "tt0413573",
//   "tt13231962",
//   "tt9288030",
//   "tt2442560",
//   "tt13819960",
//   "tt0804484",
//   "tt0264235",
//   "tt0141842",
//   "tt7203552",
//   "tt11337908",
//   "tt11947248",
//   "tt5171438",
//   "tt13668894",
//   "tt5788792",
//   "tt2741602",
//   "tt8714904",
//   "tt0903747",
//   "tt0364845",
//   "tt6048596",
//   "tt8111088",
//   "tt3107288",
//   "tt0121955",
//   "tt1844624",
//   "tt0108778",
//   "tt9737326",
//   "tt13659418",
//   "tt10574558",
//   "tt4574334",
//   "tt7767422",
//   "tt0898266",
//   "tt0452046",
//   "tt0460681",
//   "tt3230854",
//   "tt12286260",
//   "tt2306299",
//   "tt0203259",
//   "tt10653784",
//   "tt6226232",
//   "tt1219024",
//   "tt11640018",
//   "tt4326894",
//   "tt1190634",
//   "tt1606375",
//   "tt6524350",
//   "tt0213338",
//   "tt3006802",
//   "tt2359704",
//   "tt1442437",
//   "tt3007572",
//   "tt3032476",
//   "tt3743822",
//   "tt6470478",
//   "tt9817298",
//   "tt4052886",
//   "tt2261391",
//   "tt1586680",
//   "tt5420376",
//   "tt10665108",
//   "tt8772296",
//   "tt1532495",
//   "tt12851524",
//   "tt2085059",
//   "tt10478054",
//   "tt4131818",
//   "tt2467372",
//   "tt9140554",
//   "tt2560140",
//   "tt2788432",
//   "tt5071412",
// ];

// const fetchMovies = async () => {
//   let MovieArray = [];
//   // for (let i = 1; i < PopularTvShows.length - 1; i++) {
//   //   myFunction = () => {
//   //     setTimeout(function () {
//   //       console.log("waiting");
//   //     }, 1000);
//   //   };

//   try {
//     await fetch(
//       `https://imdb8.p.rapidapi.com/title/get-full-credits?tconst=${PopularTvShows[0]}`,
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
//         console.log(data);
//         MovieArray.push({ ...data, _id: PopularTvShows[0] });
//       })
//       .catch((err) => {
//         console.error(err);
//       });

//     //console.log(genreArray);
//     // return genreArray.map((gnr) => {
//     //   return { genre: gnr.description };
//     // });
//   } catch (err) {
//     console.log("err", err.stack);
//   }
//   //     myFunction();
//   //   }
//   return MovieArray;
//   //    const body = await response.json();
//   //    console.log(body);
// };

// const batchImport = async () => {
//   const client = new MongoClient(MONGO_URI, options);
//   const updated = [];
//   try {
//     await client.connect();
//     const db = client.db("MovieComb");

//     const response = await fetchMovies();
//     console.log(response);
//     // response.map((object) => {
//     //   return updated.push(object);
//     //   //   return updated.push({

//     //   //   });
//     // });
//     await db.collection("Top100TvFullCredits").insertMany(response);
//   } catch (err) {
//     console.log(err.stack);
//   } finally {
//     client.close();
//   }
// };

// batchImport();
