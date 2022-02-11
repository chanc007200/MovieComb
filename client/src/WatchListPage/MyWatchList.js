import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbNail from "../ThumbNail";

const WatchListPage = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [myWatchList, setMyWatchList] = useState(null);

  useEffect(() => {
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
    };
    getWatchList();
  }, []);
  return (
    <>
      {loadingState &&
        (myWatchList?.length === 0 || myWatchList == null ? (
          <p>No WatchList</p>
        ) : (
          <Wrapper>
            <MyWatchListTitle>My WatchList</MyWatchListTitle>
            <MyList>
              {myWatchList?.map((movieTv) => {
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
        ))}
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
export default WatchListPage;
