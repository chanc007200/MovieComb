import React from "react";
import styled from "styled-components";
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
  width: 10%;
`;
const MovieLink = styled(NavLink)``;
const TvImage = styled.img`
  height: 200px;
  width: 10%;
`;
const TvLink = styled(NavLink)``;
export default ThumbNail;
