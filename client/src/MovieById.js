import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "./Contexts/UserContext";

const MovieById = () => {
  const { movieId } = useParams();
  const [movieObject, setMovieObject] = useState(null);
  const [loadedMovie, setLoadedMovie] = useState(false);
  const { userSignedIn } = useContext(UserContext);
  const [moviePlot, setMoviePlot] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [containedMovie, setContainedMovie] = useState(false);
  const [movieImages, setMovieImages] = useState(null);

  useEffect(() => {
    const matchMovie = async () => {
      try {
        const response = await fetch(`/getMovieById/${movieId}`);
        const body = await response.json();
        setLoadedMovie(true);
        setMovieObject(body.data[0]);
        const response2 = await fetch(`/getMovieById/plot/${movieId}`);
        const body2 = await response2.json();
        setMoviePlot(body2.data[0].plot);
        const response4 = await fetch(`/getMovieById/images/${movieId}`);
        const body4 = await response4.json();
        setMovieImages(body4.data[0].images);

        if (sessionStorage.getItem("SignedInUser")) {
          const getName = sessionStorage
            .getItem("SignedInUser")
            .replace(/['"]+/g, "");

          const response3 = await fetch(`/watchList/${getName}`);
          const data3 = await response3.json();

          const result = data3.data?.filter((movie) => {
            return movie._id === movieId;
          });
          if (result.length > 0) {
            setContainedMovie(true);
          }
          setLoadingState(true);
        }
      } catch (err) {
        console.log(err.stack);
      }
    };

    matchMovie();
  }, []);

  const addMovie = async (ev) => {
    ev.preventDefault();
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
      if (data.data.modifiedCount === 1) {
        setContainedMovie(true);
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

  const removeMovie = async (ev) => {
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
      if (data.data === "deleted") {
        setContainedMovie(false);
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

  const waysToWatch = movieObject?.waysToWatch.optionGroups;

  return (
    <Wrapper>
      {loadedMovie && movieObject ? (
        <>
          <MovieContainer>
            <MovieLeftContainer>
              <MoviePoster src={movieObject?.title.image.url} />
              <div>
                {movieObject?.ratings["rating"] === undefined &&
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
                {
                  <MoviesWayToWatch>
                    <WatchTitle>Watch Now:</WatchTitle>
                    <WatchMap>
                      {waysToWatch?.map((option) => {
                        return option.watchOptions.map((op) => {
                          return (
                            <WatchMedia>{op.primaryText + ","}</WatchMedia>
                          );
                        });
                      })}
                    </WatchMap>
                  </MoviesWayToWatch>
                }
                {movieObject?.certificate !== null ? (
                  <MovieDetails>
                    Age Rating: {movieObject?.certificate}
                  </MovieDetails>
                ) : null}
              </div>
            </MovieLeftContainer>
            <div>
              <MovieTitle>{movieObject?.title.title}</MovieTitle>
              {userSignedIn && containedMovie === false && (
                <ButtonWatchList onClick={addMovie}>
                  Add to WatchList
                </ButtonWatchList>
              )}
              {userSignedIn && containedMovie === true && (
                <ButtonWatchList onClick={removeMovie}>
                  Remove From WatchList
                </ButtonWatchList>
              )}
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
              <MovieImages>
                {movieImages?.map((image) => {
                  return (
                    <>
                      <IndvidualImg src={image.url} alt="MovieImg" />
                    </>
                  );
                })}
              </MovieImages>
            </div>
          </MovieContainer>
        </>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </Wrapper>
  );
};
const WatchTitle = styled.div`
  font-size: 20px;
`;
const WatchMap = styled.div`
  font-size: 20px;
`;
const WatchMedia = styled.div`
  margin-right: 5px;
`;
const GenericDiv = styled.div`
  padding: 5px;
`;

const IndvidualImg = styled.img`
  height: 250px;
  width: 300px;
  padding: 15px;
`;
const MovieTitle = styled.span`
  font-size: 50px;
  color: white;
  margin-right: 20px;
`;
const Wrapper = styled.div`
  height: 100vh;
  margin-left: 15px;
`;
const MoviePoster = styled.img`
  width: 345px;
  height: 512px;
  margin-right: 50px;
`;
const MovieLeftContainer = styled.div``;
const MovieYear = styled.div`
  padding: 5px;
`;
const MovieInfo = styled.div`
  display: flex;
`;

const MovieRatings = styled.div``;

const MovieGenresDiv = styled.div``;

const MoviesWayToWatch = styled.div`
  display: flex;
`;

const MovieDetails = styled.span`
  font-size: 25px;
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
const MovieImages = styled.div`
  width: 1500px;
`;
export default MovieById;
