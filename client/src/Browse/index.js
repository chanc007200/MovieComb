import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ThumbNail from "../ThumbNail";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Browse = () => {
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [upcomingTvShows, setUpcomingTvShows] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [pageNumberTv, setPageNumberTv] = useState(0);
  const [pageNumberMovie, setPageNumberMovie] = useState(0);
  const [myWatchList, setMyWatchList] = useState(null);
  const [loadingState, setLoadingState] = useState(false);

  const tvMoviePerPage = 5;
  const pagesVisitedTv = pageNumberTv * tvMoviePerPage;
  const pagesVisitedMovie = pageNumberMovie * tvMoviePerPage;
  let displayUpcomingTvShows = null;
  let displayUpcomingMovies = null;
  const pageCount = Math.ceil(upcomingMovies?.length / tvMoviePerPage);

  useEffect(() => {
    const setupIncoming = async () => {
      try {
        const response = await fetch(`/getTvById/upcomingTv`);
        const body = await response.json();
        setUpcomingTvShows(body.data);
        const response2 = await fetch(`/getMovieById/upcomingMovies`);
        const body2 = await response2.json();
        setUpcomingMovies(body2.data);
        setIsUpdated(true);
      } catch (err) {
        console.log(err.stack);
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
    getWatchList();
    setupIncoming();
  }, []);

  const changePage = ({ selected }) => {
    setPageNumberTv(selected);
  };
  const changePage2 = ({ selected }) => {
    setPageNumberMovie(selected);
  };
  isUpdated && loadingState ? (
    (displayUpcomingTvShows = upcomingTvShows
      ?.slice(pagesVisitedTv, pagesVisitedTv + tvMoviePerPage)
      .map((tv) => {
        return (
          <ThumbnailContainer>
            <ThumbNail
              url={tv?.title.parentTitle.image.url}
              tvId={tv?._id}
              movieId={null}
            />
          </ThumbnailContainer>
        );
      }))
  ) : (
    <Spacing>
      <CircularProgress></CircularProgress>
    </Spacing>
  );

  isUpdated && loadingState ? (
    (displayUpcomingMovies = upcomingMovies
      ?.slice(pagesVisitedMovie, pagesVisitedMovie + tvMoviePerPage)
      .map((movie) => {
        return (
          <ThumbnailContainer>
            <ThumbNail
              url={movie?.title.image.url}
              tvId={null}
              movieId={movie?._id}
            />
          </ThumbnailContainer>
        );
      }))
  ) : (
    <Spacing>
      <CircularProgress></CircularProgress>
    </Spacing>
  );
  return (
    <Wrapper>
      <TvPaginatedContainer>
        Upcoming Tv Shows
        <TvPaginated>{displayUpcomingTvShows}</TvPaginated>
        <MyPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
        />
      </TvPaginatedContainer>
      <MoviePaginatedContainer>Upcoming Movies</MoviePaginatedContainer>

      <MoviePaginated>{displayUpcomingMovies}</MoviePaginated>
      <MyPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage2}
      />
    </Wrapper>
  );
};

const ThumbnailContainer = styled.span`
  pointer-events: none;
`;

const Spacing = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;
const TvContainer = styled.div`
  position: relative;
`;
const Wrapper = styled.div``;

const TvPaginatedContainer = styled.h1`
  display: flex;
  flex-direction: column;
`;
const TvPaginated = styled.div``;

const MoviePaginatedContainer = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;
const MoviePaginated = styled.div``;

const MyPaginate = styled(ReactPaginate)`
  display: flex;
  flex-direction: row;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    color: green;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
`;
export default Browse;
