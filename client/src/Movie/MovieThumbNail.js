import React, { useContext } from "react";
import styled from "styled-components";
import { MovieContext } from "../Contexts/MovieContext";
import { NavLink } from "react-router-dom";
const MovieThumbNail = ({ url, movieId }) => {
  return (
    <>
      {
        <MovieLink to={`/Movie/${movieId}`}>
          <MovieImage src={url} />
        </MovieLink>
      }
    </>
  );
};
const MovieImage = styled.img`
  height: 200px;
  width: 200px;
`;
const MovieLink = styled(NavLink)``;
export default MovieThumbNail;
