import React, { useEffect, useState } from "react";

const Browse = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [upcomingTvShows, setUpcomingTvShows] = useState(null);

  useEffect(() => {
    const setupIncoming = async () => {
      try {
        const response = await fetch(`/getTvById/upcomingTv`);
        const body = await response.json();
        setUpcomingTvShows(body);
        const response2 = await fetch(`/getMovieById/upcomingMovies`);
        const body2 = await response2.json();
        setUpcomingMovies(body2);
      } catch (err) {
        console.log(err.stack);
      }
    };
    setupIncoming();
  }, []);

  console.log(upcomingMovies);
  console.log(upcomingTvShows);
  return <></>;
};

export default Browse;
