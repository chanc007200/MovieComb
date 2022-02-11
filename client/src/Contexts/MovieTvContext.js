import React, { createContext, useState } from "react";
export const MovieTvContext = createContext(null);

export const MovieTvProvider = ({ children }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const [tvMovies, setTvMovies] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState({
    age: "undefined",
    runTime: "undefined",
    genres: "undefined",
    mediaType: "Movies and tv shows",
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
        formData,
        setFormData,
        setFilteredMovies,
        setFilteredTvShows,
        filteredMovies,
        filteredTvShows,
        isUpdated,
        setIsUpdated,
        setTvMovies,
        tvMovies,
      }}
    >
      {children}
    </MovieTvContext.Provider>
  );
};
