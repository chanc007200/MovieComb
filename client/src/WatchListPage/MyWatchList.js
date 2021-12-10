import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MovieContext } from "../Contexts/MovieContext";
import ThumbNail from "../ThumbNail";

const WatchListPage = () => {
  const { myWatchList, setMyWatchList, loadedMovie, setLoadedMovie } =
    useContext(MovieContext);

  console.log(myWatchList);

  return (
    <Wrapper>
      <MyWatchListTitlte>My WatchList</MyWatchListTitlte>
      <MyList>
        {loadedMovie &&
          myWatchList?.map((movie) => {
            const movieId = Object.keys(movie);
            console.log(movieId);
            return (
              <ThumbNail
                url={movie[movieId[1]].title.image.url}
                movieId={movieId[1]}
              />
            );
          })}
      </MyList>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: inline-block;
  justify-content: center;
  height: 100%;
`;
const MyList = styled.div`
  align-items: center;
  height: fit-content;
  width: 100vw;
`;

const MyWatchListTitlte = styled.div`
  font-size: 3vh;
`;
export default WatchListPage;
