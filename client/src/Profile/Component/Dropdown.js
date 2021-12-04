import React, { useState } from "react";

const Dropdown = () => {
  const [genre, setGenre] = useState([]);
  //Hardcoded in Genre but limited to what the backend can get from api
  const genreArray = [
    "Action",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Historical",
    "Horror",
    "Romance",
    "SciFi",
    "Thriller",
    "Western",
  ];

  const handleSelectGenre = () => {};
  return (
    <select onChange={handleSelectGenre} defaultValue="Select a genre">
      <option value="Select a genre" disabled>
        Select a genre
      </option>
      {genreArray.map((genre) => (
        <option>{genre}</option>
      ))}
    </select>
  );
};

export default Dropdown;
