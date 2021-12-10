import React, { useContext } from "react";
import { MovieContext } from "./Contexts/MovieContext";
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

      return movieIdToCompare[1] === movieId;
    });
    console.log(movieObject);
  }

  return (
    <Wrapper>
      {loadedMovie && movieObject.length === 1 ? (
        <>
          <MovieBanner
            style={{
              backgroundImage: `url(${movieObject[0][movieId].title.image.url}`,
            }}
          ></MovieBanner>

          <MovieContainer>
            <MoviePosterDiv>
              <MoviePoster src={movieObject[0][movieId].title.image.url} />
            </MoviePosterDiv>
            <div>
              <MovieTitle>{movieObject[0][movieId].title.title}</MovieTitle>
              <MovieInfo>
                <GenericDiv>{movieObject[0][movieId].ratings.year}</GenericDiv>
                <GenericDiv>
                  {movieObject[0][movieId].popularity.titleType}
                </GenericDiv>
                <GenericDiv>
                  {movieObject[0][movieId].title.runningTimeInMinutes}m
                </GenericDiv>
              </MovieInfo>
            </div>
          </MovieContainer>
          <div>
            <MovieRatings>
              <MovieDetails>Ratings:</MovieDetails>

              {movieObject[0][movieId].ratings.ratingCount > 0 ? (
                <>
                  <span>IMDB Rating</span>
                  <span> {movieObject[0][movieId].ratings.rating}</span>
                </>
              ) : null}
              {movieObject[0][movieId].ratings.reviewCount > 0 ? (
                <>
                  <span>Metacritic Rating </span>
                  <span>movieObject[0][movieId].metacritic.metaScore</span>
                </>
              ) : null}
            </MovieRatings>

            <MovieGenresDiv>
              <MovieDetails>Genres:</MovieDetails>

              {movieObject[0][movieId].genres.map((element) => {
                return element + " ";
              })}
            </MovieGenresDiv>

            <MoviesWayToWatch>
              <MovieDetails>Watch On:</MovieDetails>
              {movieObject[0][
                movieId
              ].waysToWatch.optionGroups[0].watchOptions.map((platform) => {
                return platform.primaryText + " ";
              })}
            </MoviesWayToWatch>
            <MovieDetails>
              Age Rating: {movieObject[0][movieId].certificate}
            </MovieDetails>
          </div>
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
const MovieRatings = styled.div``;
const MovieImdbRating = styled.div``;

const MovieGenresDiv = styled.div``;
const MovieMetacriticRating = styled.div``;
const MoviesWayToWatch = styled.div``;

const MovieDetails = styled.span`
  font-size: 25px;
`;
const MovieBanner = styled.div`
  width: 100%;
  height: 25vh;
  object-fit: cover;
`;
const MovieContainer = styled.div`
  display: flex;
`;
export default MovieById;
