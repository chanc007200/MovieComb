import React, { useEffect, useState, useContext } from "react";
import { MovieTvContext } from "../../Contexts/MovieTvContext";
import styled from "styled-components";
import ThumbNail from "../../ThumbNail";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BsBookmarkStarFill } from "react-icons/bs";
require("dotenv").config();

const SuggestionGrid = () => {
  const {
    filteredMovies,
    filteredTvShows,
    setFilteredMovies,
    setFilteredTvShows,
    isUpdated,
    setIsUpdated,
    setTvMovies,
  } = useContext(MovieTvContext);
  const [myWatchList, setMyWatchList] = useState(null);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const initialSetup = async () => {
      try {
        const response = await fetch("/getInitialSetup");
        const body = await response.json();
        setTvMovies((prevTvShowArray) => [...prevTvShowArray, body.data[0]]);
        setTvMovies((prevMovies) => [...prevMovies, body.data[1]]);
        setFilteredTvShows(body.data[0]);
        setFilteredMovies(body.data[1]);
        setIsUpdated(true);
      } catch (err) {
        console.log(err);
      }
    };
    const getWatchList = async () => {
      if (sessionStorage.getItem("SignedInUser")) {
        const getName = sessionStorage
          .getItem("SignedInUser")
          .replace(/['"]+/g, "");

        const response = await fetch(`/watchList/${getName}`);
        const data = await response.json();
        setMyWatchList(data.data);
        setLoadingState(true);
      }
      if (myWatchList === null) {
        setLoadingState(true);
      }
    };
    initialSetup();
    getWatchList();
  }, []);

  return (
    <Wrapper>
      {isUpdated && loadingState ? (
        filteredTvShows?.map((tv) => {
          if (myWatchList?.filter((obj) => obj._id === tv._id).length > 0) {
            return (
              <TvContainer>
                <AlteredBsBookmarkStarFill />
                <ThumbNail
                  url={tv?.title.image.url}
                  tvId={tv?._id}
                  movieId={null}
                />
              </TvContainer>
            );
          } else {
            return (
              <ThumbNail
                url={tv?.title.image.url}
                tvId={tv?._id}
                movieId={null}
              />
            );
          }
        })
      ) : (
        <Spacing>
          <CircularProgress></CircularProgress>
        </Spacing>
      )}
      {isUpdated && loadingState ? (
        filteredMovies?.map((movie) => {
          if (myWatchList?.filter((obj) => obj._id === movie._id).length > 0) {
            return (
              <MovieContainer>
                <AlteredBsBookmarkStarFill />
                <ThumbNail
                  url={movie?.title.image.url}
                  tvId={null}
                  movieId={movie?._id}
                />
              </MovieContainer>
            );
          } else {
            return (
              <ThumbNail
                url={movie?.title.image.url}
                movieId={movie?._id}
                tvId={null}
              />
            );
          }
        })
      ) : (
        <Spacing>
          <CircularProgress></CircularProgress>
        </Spacing>
      )}
    </Wrapper>
  );
};

const Spacing = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;

const AlteredBsBookmarkStarFill = styled(BsBookmarkStarFill)`
  position: absolute;
  z-index: 30;
  top: -180px;
  right: 0;
`;

const TvContainer = styled.span`
  position: relative;
`;

const MovieContainer = styled.span`
  position: relative;
`;

const Wrapper = styled.div``;
export default SuggestionGrid;
