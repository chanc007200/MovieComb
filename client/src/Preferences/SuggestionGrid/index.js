import React, { useEffect, useState, useContext } from "react";
import { MovieTvContext } from "../../Contexts/MovieTvContext";
import styled from "styled-components";
import ThumbNail from "../../ThumbNail";
import CircularProgress from "@material-ui/core/CircularProgress";
const { REACT_APP_API_KEY } = process.env;
require("dotenv").config();

const SuggestionGrid = ({ movieArray, tvArray, setMovieArray, setTvArray }) => {
  const { formData, setFormData, isUpdated } = useContext(MovieTvContext);
  const [loadedPreferences, setLoadedPreferences] = useState(false);

  useEffect(() => {
    const initialSetup = async () => {
      try {
        const response = await fetch("/getInitialSetup");
        const body = await response.json();
        setTvArray(body.data[0]);
        setMovieArray(body.data[1]);
        setLoadedPreferences(true);
      } catch (err) {
        console.log(err);
      }
    };
    initialSetup();
  }, [isUpdated]);

  return (
    <>
      {loadedPreferences ? (
        tvArray?.map((tv) => {
          return (
            <ThumbNail
              url={tv?.title.image.url}
              tvId={tv?._id}
              movieId={null}
            />
          );
        })
      ) : (
        <Spacing>
          <CircularProgress></CircularProgress>
        </Spacing>
      )}
      {loadedPreferences ? (
        movieArray?.map((movie) => {
          return (
            <ThumbNail
              url={movie?.title.image.url}
              movieId={movie?._id}
              tvId={null}
            />
          );
        })
      ) : (
        <Spacing>
          <CircularProgress></CircularProgress>
        </Spacing>
      )}
    </>
  );
};
const Wrapper = styled.div``;
const Spacing = styled.div`
  margin-top: 50px;
  margin-left: 50px;
`;
export default SuggestionGrid;
