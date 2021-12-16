import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Dropdown from "../Form/Dropdown";
import {
  genreOptions,
  mediaOptions,
  runtimeOptions,
  ageFilterOptions,
} from "./OptionSettings";
import Input from "../Form/Input";
import PlatformGrid from "./Platforms/PlatformGrid";
import SuggestionGrid from "./SuggestionGrid";
import { MovieTvContext } from "../Contexts/MovieTvContext";

const Preferences = () => {
  const {
    formData,
    setFormData,
    setFilteredMovies,
    setFilteredTvShows,
    filteredMovies,
    filteredTvShows,
    isUpdated,
    setIsUpdated,
  } = useContext(MovieTvContext);
  const [movieArray, setMovieArray] = useState([]);
  const [tvArray, setTvArray] = useState([]);

  let [rating, setRating] = useState({ start: 0, end: 100 });
  let [releaseYear, setReleaseYear] = useState({ start: 0, end: 100 });

  const handleChange = (value, name) => {
    console.log(value);
    console.log(name);
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    let newTvArray = [];
    let newMovieArray = [];
    console.log(typeof formData.age);

    if (formData.genres !== "undefined") {
      newTvArray = tvArray.filter((tvShow) => {
        return tvShow?.genres.includes(formData.genres);
      });
      if (formData.genres !== "undefined") {
        newMovieArray = movieArray.filter((movie) => {
          console.log(typeof movie?.genres[0]);
          return movie?.genres.includes(formData.genres);
        });
      }
    }
    if (formData.title !== "") {
      newTvArray = tvArray.filter((tvShow) =>
        tvShow?.title.title.toLowerCase().includes(formData.title.toLowerCase())
      );
      newMovieArray = movieArray.filter((movie) =>
        movie?.title.title.toLowerCase().includes(formData.title.toLowerCase())
      );
    }
    console.log(formData.runTime);
    if (formData.runTime !== "undefined") {
      let startNum = null;
      let endNum = null;
      switch (formData.runTime) {
        case "lessHour":
          startNum = 0;
          endNum = 60;
          break;
        case "hourToTwo":
          startNum = 60;
          endNum = 120;
          break;
        case "moretwoHours":
          startNum = 120;
          endNum = 999;
          break;
        default:
          console.log("undefined");
      }
      newTvArray = tvArray.filter(
        (tvShow) =>
          startNum <= tvShow?.title.runningTimeInMinutes &&
          tvShow?.title.runningTimeInMinutes <= endNum
      );
      newMovieArray = movieArray.filter(
        (movie) =>
          startNum <= movie?.title.runningTimeInMinutes &&
          movie?.title.runningTimeInMinutes <= endNum
      );
    }
    if (formData.mediaType === "tv shows") {
      newTvArray = tvArray.filter((tvShow) => {
        return tvShow.title.titleType.includes("tv");
      });
    }
    if (formData.mediaType === "movies") {
      newMovieArray = movieArray.filter((movie) => {
        return (movie.title.titleType = "movie");
      });
    }
    console.log(typeof formData.age);
    if (formData.age !== "undefined") {
      newTvArray = tvArray.filter(
        (tvShow) => tvShow?.certificate === formData.age
      );

      newMovieArray = movieArray.filter(
        (movie) => movie?.certificate === formData.age
      );
    }

    // if (formData.Netflix === true) {
    //   newTvArray = tvArray.filter((tvShow) => {
    //     tvShow.map((option) => {
    //       return option.watchOptions.map((op) => {
    //         return <>{op.primaryText}</>;
    //       });
    //     });
    //   });
    // }

    console.log(newTvArray);
    console.log(newMovieArray);
    //console.log(newArray);
    setFilteredMovies(newMovieArray);
    setFilteredTvShows(newTvArray);
  }, [formData]);
  console.log(tvArray);
  console.log(movieArray);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setMovieArray(filteredMovies);
    setTvArray(filteredTvShows);
  };

  const handleReset = (ev) => {
    ev.preventDefault();
    setIsUpdated(!isUpdated);
    formData.age = "undefined";
    formData.runTime = "undefined";
    formData.genres = "undefined";
    formData.mediaType = "movies and tv shows";
    formData.title = "";
    formData.Netflix = false;
    formData.Prime = false;
    formData.Disney = false;
    formData.Hbo = false;
    formData.Hulu = false;
    formData.Peacock = false;
    formData.Paramount = false;
    formData.Starz = false;
    formData.Showtime = false;
    formData.Apple = false;
    formData.Mubi = false;
  };
  return (
    <Wrapper>
      <Title>What do you want to watch today?</Title>
      <FormContainer onSubmit={(ev) => handleSubmit(ev)}>
        <DropdownBoxes>
          <MediaBox>
            <MediaDropdown
              label="mediaType"
              htmlFor="mediaType"
              selection={formData.mediaType}
              handleChange={handleChange}
              options={mediaOptions}
            />
          </MediaBox>
          <GenreBox>
            <GenreDropdown
              label="genres"
              htmlFor="genres"
              selection={formData.genres}
              handleChange={handleChange}
              options={genreOptions}
            />
          </GenreBox>
          <RunTimeBox>
            <RunTimeDropdown
              label="runTime"
              htmlFor="runTime"
              selection={formData.runTime}
              handleChange={handleChange}
              options={runtimeOptions}
            />
          </RunTimeBox>
          <AgeFilterBox>
            <AgeFilterDropdown
              label="age"
              htmlFor="age"
              selection={formData.age}
              handleChange={handleChange}
              options={ageFilterOptions}
            />
          </AgeFilterBox>
        </DropdownBoxes>
        <SearchContainer>
          Search:
          <TitleInput
            name="title"
            type="text"
            placeholder="Title"
            handleChange={handleChange}
          />
        </SearchContainer>
        <PlatformGrid handleChange={handleChange} />
        {/* </FormInput> */}
        <SubmitButton type="submit">Submit</SubmitButton>
        <ResetButton type="button" onClick={handleReset}>
          Reset
        </ResetButton>
      </FormContainer>
      <SuggestionGridDiv>
        <SuggestionGrid
          movieArray={movieArray}
          tvArray={tvArray}
          setTvArray={setTvArray}
          setMovieArray={setMovieArray}
        />
      </SuggestionGridDiv>
    </Wrapper>
  );
};
const SearchContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
`;
const Title = styled.div`
  margin-bottom: 15px;
  font-size: 20px;
`;
const ResetButton = styled.button`
  background-color: green;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const FormContainer = styled.form``;

const SubmitButton = styled.button`
  background-color: green;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const GenreBox = styled.div`
  margin-right: 1vw;
`;

const GenreDropdown = styled(Dropdown)``;

const MediaBox = styled.div`
  margin-right: 1vw;
`;
const MediaDropdown = styled(Dropdown)``;
const RunTimeBox = styled.div`
  margin-right: 1vw;
`;
const RunTimeDropdown = styled(Dropdown)``;

const AgeFilterBox = styled.div`
  margin-right: 1vw;
`;
const Rating = styled.div`
  margin-right: 2vw;
  border: 5px solid green;
`;
const AgeFilterDropdown = styled(Dropdown)``;

const FormInput = styled.form``;
const TitleInput = styled(Input)``;
const DirectorInput = styled(Input)``;
const CastInput = styled(Input)``;

const DropdownBoxes = styled.div`
  display: flex;
`;

const SuggestionGridDiv = styled.div`
  height: 70vh;
  width: 100%;
`;
const ReleaseYear = styled.div`
  margin-right: 2vw;
  border: 5px solid green;
`;

export default Preferences;
