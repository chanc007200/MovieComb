import React, { createContext, useState } from "react";
export const MovieTvContext = createContext(null);

export const MovieTvProvider = ({ children }) => {
  const [myWatchList, setMyWatchList] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState({
    age: "undefined",
    runTime: "undefined",
    genres: "undefined",
    mediaType: "movies and tv shows",
    title: "",

    Netflix: false,
    Prime: false,
    Disney: false,
    Hbo: false,
    Hulu: false,
    Peacock: false,
    Paramount: false,
    Starz: false,
    Showtime: false,
    Apple: false,
    Mubi: false,
  });

  return (
    <MovieTvContext.Provider
      value={{
        myWatchList,
        setMyWatchList,
        formData,
        setFormData,
        setFilteredMovies,
        setFilteredTvShows,
        filteredMovies,
        filteredTvShows,
        isUpdated,
        setIsUpdated,
      }}
    >
      {children}
    </MovieTvContext.Provider>
  );
};
