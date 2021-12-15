import React, { createContext, useState } from "react";
export const MovieTvContext = createContext(null);

export const MovieTvProvider = ({ children }) => {
  const [myWatchList, setMyWatchList] = useState([]);
  const [formData, setFormData] = useState({
    age: "undefined",
    runTime: "undefined",
    language: "english",
    genre: "undefined",
    mediaType: "movies and tv shows",
  });

  return (
    <MovieTvContext.Provider
      value={{
        myWatchList,
        setMyWatchList,
        formData,
        setFormData,
      }}
    >
      {children}
    </MovieTvContext.Provider>
  );
};
