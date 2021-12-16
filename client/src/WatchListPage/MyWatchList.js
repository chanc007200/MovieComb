import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ThumbNail from "../ThumbNail";
import { MovieTvContext } from "../Contexts/MovieTvContext";

const WatchListPage = () => {
  const { myWatchList, setMyWatchList } = useContext(MovieTvContext);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const getWatchList = async () => {
      if (sessionStorage.getItem("SignedInUser")) {
        const getName = sessionStorage
          .getItem("SignedInUser")
          .replace(/['"]+/g, "");

        const response = await fetch(`/watchList/${getName}`);
        const data = await response.json();

        setMyWatchList([data.data]);
        setLoadingState(true);
      }
    };
    getWatchList();
  }, []);

  return (
    <>
      {myWatchList && loadingState && (
        <Wrapper>
          <MyWatchListTitle>My WatchList</MyWatchListTitle>
          <MyList>
            {myWatchList[0]?.map((movieTv) => {
              const titleType = movieTv.title.titleType;
              {
                if (titleType === "movie") {
                  return (
                    <ThumbNail
                      url={movieTv?.title.image.url}
                      movieId={movieTv?._id}
                      tvId={null}
                    />
                  );
                } else {
                  return (
                    <ThumbNail
                      url={movieTv?.title.image.url}
                      tvId={movieTv?._id}
                      movieId={null}
                    />
                  );
                }
              }
            })}
          </MyList>
        </Wrapper>
      )}
      {myWatchList.length === 0 && <p>No watchlist</p>}
    </>
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

const MyWatchListTitle = styled.div`
  font-size: 3vh;
`;
const Spacing = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;
export default WatchListPage;
