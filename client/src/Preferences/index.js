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
    isUpdated,
    setIsUpdated,

    tvMovies,
  } = useContext(MovieTvContext);

  const handleChange = (value, name) => {
    setIsUpdated(false);
    setFormData({ ...formData, [name]: value });
    setIsUpdated(true);
  };

  useEffect(() => {
    if (isUpdated) {
      let originalTv = tvMovies[0];
      let originalMovies = tvMovies[1];
      let newTvArray = originalTv;
      let newMovieArray = originalMovies;

      if (formData.mediaType === "Tv shows") {
        newTvArray = newTvArray.filter((tvShow) => {
          return (
            tvShow?.title.titleType === "tvSeries" ||
            tvShow?.title.titleType === "tvMiniSeries"
          );
        });
        newMovieArray = [];
      }
      if (formData.mediaType === "Movies") {
        newTvArray = [];
        newMovieArray = newMovieArray.filter((movie) => {
          return movie?.title.titleType === "movie";
        });
      }
      if (formData.genres !== "undefined" && formData.genres !== "No Genre") {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow?.genres.includes(formData.genres);
        });
        newMovieArray = newMovieArray.filter((movie) => {
          return movie?.genres.includes(formData.genres);
        });
      }
      if (formData.title !== "") {
        newTvArray = originalTv.filter((tvShow) =>
          tvShow?.title.title
            .toLowerCase()
            .includes(formData.title.toLowerCase())
        );
        newMovieArray = originalMovies.filter((movie) =>
          movie?.title.title
            .toLowerCase()
            .includes(formData.title.toLowerCase())
        );
      }
      if (
        formData.runTime !== "undefined" &&
        formData.runTime !== "No Specified RunTime"
      ) {
        let startNum = null;
        let endNum = null;
        switch (formData.runTime) {
          case "LessHour":
            startNum = 0;
            endNum = 60;
            break;
          case "HourToTwo":
            startNum = 60;
            endNum = 120;
            break;
          case "MoretwoHours":
            startNum = 120;
            endNum = 999;
            break;
          default:
            console.log("undefined");
        }
        newTvArray = newTvArray.filter((tvShow) => {
          return (
            startNum <= tvShow?.title.runningTimeInMinutes &&
            tvShow?.title.runningTimeInMinutes <= endNum
          );
        });
        newMovieArray = newMovieArray.filter((movie) => {
          return (
            startNum <= movie?.title.runningTimeInMinutes &&
            movie?.title.runningTimeInMinutes <= endNum
          );
        });
      }

      if (formData.age !== "undefined" && formData.age !== "No Age Filter") {
        newTvArray = newTvArray.filter(
          (tvShow) => tvShow?.certificate === formData.age
        );

        newMovieArray = newMovieArray.filter(
          (movie) => movie?.certificate === formData.age
        );
      }

      if (formData.Netflix === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Netflix";
            });
          });
        });
      }

      if (formData.Netflix === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Netflix";
            });
          });
        });
      }
      if (formData.Prime === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Prime Video";
            });
          });
        });
      }

      if (formData.Prime === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Prime Video";
            });
          });
        });
      }
      if (formData.Hbo === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "HBO Max";
            });
          });
        });
      }

      if (formData.Hbo === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "HBO Max";
            });
          });
        });
      }
      if (formData.Hulu === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Hulu";
            });
          });
        });
      }

      if (formData.Hulu === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Hulu";
            });
          });
        });
      }

      if (formData.Paramount === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Paramount+";
            });
          });
        });
      }

      if (formData.Paramount === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "Paramount+";
            });
          });
        });
      }
      if (formData.Nbc === true) {
        newTvArray = newTvArray.filter((tvShow) => {
          return tvShow.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "NBC";
            });
          });
        });
      }

      if (formData.Nbc === true) {
        newMovieArray = newMovieArray.filter((movie) => {
          return movie.waysToWatch.optionGroups?.find((options) => {
            return options.watchOptions.find((innerOptions) => {
              return innerOptions.primaryText === "NBC";
            });
          });
        });
      }
      setFilteredMovies(newMovieArray);
      setFilteredTvShows(newTvArray);
    }
  }, [formData]);

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
    formData.Hbo = false;
    formData.Hulu = false;
    formData.Paramount = false;
    formData.Nbc = false;
  };
  return (
    <Wrapper>
      <Title>What do you want to watch today?</Title>
      <FormContainer>
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
        <ResetButton type="button" onClick={handleReset}>
          Reset
        </ResetButton>
      </FormContainer>
      <SuggestionGridDiv>
        <SuggestionGrid />
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

const AgeFilterDropdown = styled(Dropdown)``;

const TitleInput = styled(Input)``;

const DropdownBoxes = styled.div`
  display: flex;
`;

const SuggestionGridDiv = styled.div`
  height: 70vh;
  width: 100%;
`;

export default Preferences;
