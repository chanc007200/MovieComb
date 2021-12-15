import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "./Contexts/UserContext";
import { MovieTvContext } from "./Contexts/MovieTvContext";
const MovieById = () => {
  const { tvId } = useParams();
  const [tvObject, setTvObject] = useState(null);
  const [loadedTv, setLoadedTv] = useState(false);
  const { userSignedIn } = useContext(UserContext);
  const { myWatchList, setMyWatchList } = useContext(MovieTvContext);
  const [tvPlot, setTvPlot] = useState(null);
  const [loadingState, setLoadingState] = useState(false);
  const [containedTvShow, setContainedTvShow] = useState(false);

  useEffect(() => {
    const matchTv = async () => {
      try {
        const response = await fetch(`/getTvById/${tvId}`);
        const body = await response.json();
        console.log(body.data[0]);
        setLoadedTv(true);
        setTvObject(body.data[0]);
        const response2 = await fetch(`/getTvById/plot/${tvId}`);
        const body2 = await response2.json();
        setTvPlot(body2.data[0].plot);
        console.log(body2.data[0].plot);
        if (sessionStorage.getItem("SignedInUser")) {
          const getName = sessionStorage
            .getItem("SignedInUser")
            .replace(/['"]+/g, "");
          console.log(getName);
          const response3 = await fetch(`/watchList/${getName}`);
          const data3 = await response3.json();
          console.log(data3);
          const result = data3.data?.filter((tvshow) => {
            return tvshow._id === tvId;
          });
          if (result.length > 0) {
            setContainedTvShow(true);
          }
          console.log(data3);
          setMyWatchList([data3.data]);
          setLoadingState(true);
        }
      } catch (err) {
        console.log(err.stack);
      }
    };

    matchTv();
  }, []);

  const addTv = async (ev) => {
    ev.preventDefault();
    console.log(userSignedIn);
    console.log(tvObject);
    const settings = {
      method: "PUT",
      body: JSON.stringify({ userSignedIn, tvObject }),
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
      body: JSON.stringify({ userSignedIn, tvObject }),
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

  console.log(myWatchList);
  console.log(containedTvShow);

  return (
    <Wrapper>
      {loadedTv && tvObject ? (
        <>
          <TvContainer>
            <TvPosterDiv>
              <TvPoster src={tvObject?.title.image.url} />
            </TvPosterDiv>
            <div>
              <TvTitle>{tvObject?.title.title}</TvTitle>
              <TvInfo>
                <GenericDiv>{tvObject?.ratings.year}</GenericDiv>
                <GenericDiv>{tvObject?.popularity.titleType}</GenericDiv>
                {tvObject?.title["runningTimeInMinutes"] !== undefined ? (
                  <GenericDiv>
                    {tvObject?.title.runningTimeInMinutes} minutes
                  </GenericDiv>
                ) : null}
              </TvInfo>
              <TvPlot>{tvPlot}</TvPlot>
            </div>
          </TvContainer>
          <div>
            {tvObject?.ratings["rating"] == undefined &&
            tvObject?.metacritic.reviewCount > 0 ? null : (
              <TvRatings>
                <TvDetails>Ratings:</TvDetails>

                {tvObject?.ratings.ratingCount > 0 ? (
                  <>
                    <span>IMDB Rating</span>
                    <span> {tvObject?.ratings.rating}</span>
                  </>
                ) : null}
                {tvObject?.ratings.reviewCount > 0 ? (
                  <>
                    <span>Metacritic Rating </span>
                    <span>{tvObject?.metacritic.metaScore}</span>
                  </>
                ) : null}
              </TvRatings>
            )}
            <TvGenresDiv>
              <TvDetails>Genres:</TvDetails>

              {tvObject.genres?.map((element) => {
                return element + " ";
              })}
            </TvGenresDiv>
            {"watchOptions" in tvObject && (
              <TvWayToWatch>
                <TvDetails>Watch On:</TvDetails>
                {tvObject?.waysToWatch.optionGroups[0].watchOptions?.map(
                  (platform) => {
                    return platform.primaryText + " ";
                  }
                )}
              </TvWayToWatch>
            )}
            {tvObject?.certificate !== null ? (
              <TvDetails>Age Rating: {tvObject?.certificate}</TvDetails>
            ) : null}
          </div>
          {userSignedIn && containedTvShow === false && (
            <ButtonWatchList onClick={addTv}>Add to WatchList</ButtonWatchList>
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

const TvTitle = styled.span`
  font-size: 50px;
  color: white;
`;
const Wrapper = styled.div`
  background-color: black;
  height: 100vh;
  margin-left: 15px;
`;
const TvPoster = styled.img`
  width: 345px;
  height: 512px;
`;
const TvPosterDiv = styled.div``;
const TvYear = styled.div`
  padding: 5px;
`;
const TvInfo = styled.div`
  display: flex;
`;
const TvType = styled.div`
  padding: 5px;
`;
const TvRunTime = styled.div`
  padding: 5px;
`;
const TvRatings = styled.div``;
const TvImdbRating = styled.div``;

const TvGenresDiv = styled.div``;
const TvMetacriticRating = styled.div``;
const TvWayToWatch = styled.div``;

const TvDetails = styled.span`
  font-size: 25px;
`;
const TvBanner = styled.div`
  width: 85vw;
  height: 25vh;
  background-repeat: no-repeat;
  border: solid red 5px;
`;
const TvContainer = styled.div`
  display: flex;
`;

const ButtonWatchList = styled.button`
  background-color: green;
`;

const TvPlot = styled.div`
  margin-top: 5vh;
`;
export default MovieById;
