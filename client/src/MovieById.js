import React, { useState, useEffect, useContext } from "react";
import { MovieTvContext } from "./Contexts/MovieTvContext";
import { useParams } from "react-router";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "./Contexts/UserContext";
const MovieById = () => {
  const { movieId } = useParams();
  const [movieObject, setMovieObject] = useState(null);
  const [loadedMovie, setLoadedMovie] = useState(false);
  const { userSignedIn } = useContext(UserContext);
  const { myWatchList, setMyWatchList } = useContext(MovieTvContext);
  const [moviePlot, setMoviePlot] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [containedTvShow, setContainedTvShow] = useState(false);

  useEffect(() => {
    const matchMovie = async () => {
      try {
        const response = await fetch(`/getMovieById/${movieId}`);
        const body = await response.json();
        console.log(body.data[0]);
        setLoadedMovie(true);
        setMovieObject(body.data[0]);
        const response2 = await fetch(`/getMovieById/plot/${movieId}`);
        const body2 = await response2.json();
        setMoviePlot(body2.data[0].plot);
        console.log(body2.data[0].plot);
      } catch (err) {
        console.log(err.stack);
      }
      if (sessionStorage.getItem("SignedInUser")) {
        const getName = sessionStorage
          .getItem("SignedInUser")
          .replace(/['"]+/g, "");
        console.log(getName);
        const response3 = await fetch(`/watchList/${getName}`);
        const data3 = await response3.json();
        console.log(data3);
        const result = data3.data?.filter((movie) => {
          return movie._id === movieId;
        });
        if (result.length > 0) {
          setContainedTvShow(true);
        }
        console.log(data3);
        setMyWatchList([data3.data]);
        setLoadingState(true);
      }
    };

    matchMovie();
  }, []);

  const addMovie = async (ev) => {
    ev.preventDefault();
    console.log(userSignedIn);
    console.log(movieObject);
    const settings = {
      method: "PUT",
      body: JSON.stringify({ userSignedIn, movieObject }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`/addToWatchList`, settings);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.stack);
    }
  };

  const removeTv = async (ev) => {
    ev.preventDefault();
    const settings = {
      method: "DELETE",
      body: JSON.stringify({ userSignedIn, movieObject }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`/removeFromWatchList`, settings);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.stack);
    }
  };
  return (
    <Wrapper>
      {loadedMovie && movieObject ? (
        <>
          <MovieContainer>
            <MoviePosterDiv>
              <MoviePoster src={movieObject?.title.image.url} />
            </MoviePosterDiv>
            <div>
              <MovieTitle>{movieObject?.title.title}</MovieTitle>
              <MovieInfo>
                <GenericDiv>{movieObject?.ratings.year}</GenericDiv>
                <GenericDiv>{movieObject?.popularity.titleType}</GenericDiv>
                {movieObject?.title["runningTimeInMinutes"] !== undefined ? (
                  <GenericDiv>
                    {movieObject?.title.runningTimeInMinutes} minutes
                  </GenericDiv>
                ) : null}
              </MovieInfo>
              <MoviePlot>{moviePlot}</MoviePlot>
            </div>
          </MovieContainer>
          <div>
            {movieObject?.ratings["rating"] == undefined &&
            movieObject?.metacritic.reviewCount === 0 ? null : (
              <MovieRatings>
                <MovieDetails>Ratings:</MovieDetails>

                {movieObject?.ratings.ratingCount > 0 ? (
                  <>
                    <span>IMDB Rating</span>
                    <span> {movieObject?.ratings.rating}</span>
                  </>
                ) : null}
                {movieObject?.ratings.reviewCount > 0 ? (
                  <>
                    <span>Metacritic Rating </span>
                    <span>{movieObject?.metacritic.metaScore}</span>
                  </>
                ) : null}
              </MovieRatings>
            )}

            <MovieGenresDiv>
              <MovieDetails>Genres:</MovieDetails>

              {movieObject?.genres.map((element) => {
                return element + " ";
              })}
            </MovieGenresDiv>
            {"watchOptions" in movieObject && (
              <MoviesWayToWatch>
                <MovieDetails>Watch On:</MovieDetails>
                {movieObject?.waysToWatch.optionGroups[0].watchOptions.map(
                  (platform) => {
                    return platform.primaryText + " ";
                  }
                )}
              </MoviesWayToWatch>
            )}
            {movieObject?.certificate !== null ? (
              <MovieDetails>
                Age Rating: {movieObject?.certificate}
              </MovieDetails>
            ) : null}
          </div>
          {userSignedIn && (
            <ButtonWatchList onClick={addMovie}>
              Add to WatchList
            </ButtonWatchList>
          )}
          {userSignedIn && containedTvShow === true && (
            <ButtonWatchList onClick={removeTv}>
              Remove From WatchList
            </ButtonWatchList>
          )}
        </>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </Wrapper>
  );
};

const GenericDiv = styled.div`
  padding: 5px;
`;

const MovieTitle = styled.span`
  font-size: 50px;
  color: white;
`;
const Wrapper = styled.div`
  background-color: black;
  height: 100vh;
  margin-left: 15px;
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
  width: 85vw;
  height: 25vh;
  background-repeat: no-repeat;
  border: solid red 5px;
`;
const MovieContainer = styled.div`
  display: flex;
`;
const ButtonWatchList = styled.button`
  background-color: green;
`;
const MoviePlot = styled.div`
  margin-top: 5vh;
`;
export default MovieById;
