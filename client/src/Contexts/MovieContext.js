import React, { createContext, useEffect, useState } from "react";
export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [myWatchList, setMyWatchList] = useState([]);
  const [loadedMovie, setLoadedMovie] = useState(false);

  useEffect(() => {
    const setMyWatchListFromServer = async () => {
      try {
        const response = await fetch("/getMovie");
        const body = await response.json();
        console.log("hi", body);
        setMyWatchList(body.data);
        console.log(body.data);
        setLoadedMovie(true);
      } catch (err) {
        console.log(err);
      }
    };

    setMyWatchListFromServer();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        myWatchList,
        setMyWatchList,
        loadedMovie,
        setLoadedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
