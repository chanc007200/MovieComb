import React, { useContext } from "react";
import { MovieContext } from "../Contexts/MovieContext";
import { useParams } from "react-router";
import styled from "styled-components";
const MovieById = () => {
  const { movieId } = useParams();
  const { myWatchList, loadedMovie } = useContext(MovieContext);
  // const movieIdToCompare = Object.keys(myWatchList);
  // console.log(movieIdToCompare[1]);
  let movieObject = null;

  if (loadedMovie) {
    movieObject = myWatchList.filter((movie) => {
      const movieIdToCompare = Object.keys(movie);
      console.log(movieIdToCompare);
      return movieIdToCompare[1] === movieId;
    });
  }

  return (
    <Wrapper>
      {loadedMovie && movieObject.length === 1 ? (
        <>
          <MovieTitle>{movieObject[0][movieId].title.title}</MovieTitle>
          <MovieRatings>
            <MovieImdbRating>
              IMDB Rating {movieObject[0][movieId].ratings.rating}
            </MovieImdbRating>
            <MovieMetacriticRating>
              Metacritic Rating {movieObject[0][movieId].metacritic.metaScore}
            </MovieMetacriticRating>
          </MovieRatings>
          <MovieInfo>
            <GenericDiv>{movieObject[0][movieId].ratings.year}</GenericDiv>
            <GenericDiv>
              {movieObject[0][movieId].popularity.titleType}
            </GenericDiv>
            <GenericDiv>
              {movieObject[0][movieId].title.runningTimeInMinutes}m
            </GenericDiv>
          </MovieInfo>

          <MoviePosterDiv>
            <MoviePoster src={movieObject[0][movieId].title.image.url} />
          </MoviePosterDiv>
          <MovieGenresDiv>
            {movieObject[0][movieId].genres.map((element) => {
              return element + " ";
            })}
          </MovieGenresDiv>

          <MoviesWayToWatch>
            {movieObject[0][
              movieId
            ].waysToWatch.optionGroups[0].watchOptions.map((platform) => {
              return platform.primaryText + " ";
            })}
          </MoviesWayToWatch>
        </>
      ) : (
        <ErrorMessage>No Movie was found with this id</ErrorMessage>
      )}
    </Wrapper>
  );
};

const GenericDiv = styled.div`
  padding: 5px;
`;
const ErrorMessage = styled.div``;
const MovieTitle = styled.span`
  font-size: 50px;
  color: white;
`;
const Wrapper = styled.div`
  background-color: black;
  height: 100vh;
`;
const MoviePoster = styled.img`
  width: 345px;
  height: 512px;
`;
const MoviePosterDiv = styled.div``;
const MovieYear = styled.div`
  padding: 5px;
`;
const MovieInfo = styled.div`
  display: flex;
`;
const MovieType = styled.div`
  padding: 5px;
`;
const MovieRunTime = styled.div`
  padding: 5px;
`;
const MovieRatings = styled.div`
  float: right;
  margin: 5px;
`;
const MovieImdbRating = styled.div``;

const MovieGenresDiv = styled.div``;
const MovieMetacriticRating = styled.div``;
const MoviesWayToWatch = styled.div``;
export default MovieById;
