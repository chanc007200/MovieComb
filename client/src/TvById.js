import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "./Contexts/UserContext";

const MovieById = () => {
  const { tvId } = useParams();
  const [tvObject, setTvObject] = useState(null);
  const [loadedTv, setLoadedTv] = useState(false);
  const { userSignedIn } = useContext(UserContext);
  const [tvPlot, setTvPlot] = useState(null);
  const [containedTvShow, setContainedTvShow] = useState(false);
  const [tvSeason, setTvSeason] = useState(null);
  const [tvImages, setTvImages] = useState(null);

  useEffect(() => {
    const matchTv = async () => {
      try {
        const response = await fetch(`/getTvById/${tvId}`);
        const body = await response.json();
        setTvObject(body.data[0]);
        const response2 = await fetch(`/getTvById/plot/${tvId}`);
        const body2 = await response2.json();
        setTvPlot(body2.data[0].plot);
        const response4 = await fetch(`/getTvById/seasons/${tvId}`);
        const body4 = await response4.json();
        setTvSeason(body4.data);
        const NUMBEROFSEASONS = Object.keys(body4.data).length - 1;
        const response5 = await fetch(`/getTvById/images/${tvId}`);
        const body5 = await response5.json();
        let imageArray = [];
        for (let i = 0; i < NUMBEROFSEASONS; i++) {
          imageArray.push(body5.data[0].images[i]);
        }
        setTvImages(imageArray);

        if (sessionStorage.getItem("SignedInUser")) {
          const getName = sessionStorage
            .getItem("SignedInUser")
            .replace(/['"]+/g, "");
          const response3 = await fetch(`/watchList/${getName}`);
          const data3 = await response3.json();
          const result = data3.data?.filter((tvshow) => {
            return tvshow._id === tvId;
          });
          if (result.length > 0) {
            setContainedTvShow(true);
          }
        }
        setLoadedTv(true);
      } catch (err) {
        console.log(err.stack);
      }
    };

    matchTv();
  }, []);
  const addTv = async (ev) => {
    ev.preventDefault();
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
      if (data.data.modifiedCount === 1) {
        setContainedTvShow(true);
      }
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
      if (data.data === "deleted") {
        setContainedTvShow(false);
      }
    } catch (err) {
      console.log(err.stack);
    }
  };

  const waysToWatch = tvObject?.waysToWatch.optionGroups;

  return (
    <Wrapper>
      {loadedTv && tvObject ? (
        <>
          <TvContainer>
            <TvLeftContainer>
              <TvPoster src={tvObject?.title.image.url} />
              <div>
                {tvObject?.ratings["rating"] === undefined &&
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
                {
                  <TvWayToWatch>
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
                  </TvWayToWatch>
                }
                {tvObject?.certificate !== null ? (
                  <TvDetails>
                    Age Rating: <AgeDetails>{tvObject?.certificate}</AgeDetails>
                  </TvDetails>
                ) : null}
              </div>
            </TvLeftContainer>
            <div>
              <TvTitle>{tvObject?.title.title}</TvTitle>
              {userSignedIn && containedTvShow === false && (
                <ButtonWatchList onClick={addTv}>
                  Add to WatchList
                </ButtonWatchList>
              )}
              {userSignedIn && containedTvShow === true && (
                <ButtonWatchList onClick={removeTv}>
                  Remove From WatchList
                </ButtonWatchList>
              )}

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
              <TvImages>
                {tvImages?.map((image, index) => {
                  return (
                    <TvSeasonBox>
                      <IndividualImg src={image.url} alt="TvImg" />
                      <span>Season {index + 1}</span>
                    </TvSeasonBox>
                  );
                })}
              </TvImages>
            </div>
          </TvContainer>
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
const AgeDetails = styled.div`
  font-size: 17px;
  display: inline-block;
`;
const GenericDiv = styled.div`
  padding: 5px;
`;
const IndividualImg = styled.img`
  height: 250px;
  width: 300px;
  padding: 15px;
`;
const TvTitle = styled.span`
  font-size: 40px;
  color: white;
  margin-right: 20px;
`;
const Wrapper = styled.div`
  height: 100vh;
  margin-left: 15px;
`;
const TvPoster = styled.img`
  width: 345px;
  height: 512px;
`;
const TvLeftContainer = styled.div``;

const TvInfo = styled.div`
  display: flex;
`;

const TvRatings = styled.div``;

const TvGenresDiv = styled.div``;

const TvWayToWatch = styled.div`
  display: flex;
`;

const TvDetails = styled.span`
  font-size: 20px;
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
const TvImages = styled.div`
  width: 1500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
`;

const TvSeasonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
export default MovieById;
