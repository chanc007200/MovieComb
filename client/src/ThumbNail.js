import React, { useContext } from "react";
import styled from "styled-components";
import { MovieTvContext } from "./Contexts/MovieTvContext";
import { NavLink } from "react-router-dom";
const ThumbNail = ({ url, movieId, tvId }) => {
  return (
    <>
      {movieId !== null ? (
        <MovieLink to={`/Movie/${movieId}`}>
          <MovieImage src={url} />
        </MovieLink>
      ) : (
        <TvLink to={`/TvShow/${tvId}`}>
          <TvImage src={url} />
        </TvLink>
      )}
    </>
  );
};
const MovieImage = styled.img`
  height: 200px;
  width: 200px;
`;
const MovieLink = styled(NavLink)``;
const TvImage = styled.img`
  height: 200px;
  width: 200px;
`;
const TvLink = styled(NavLink)``;
export default ThumbNail;
