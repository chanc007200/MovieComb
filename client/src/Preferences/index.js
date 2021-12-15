import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Dropdown from "../Form/Dropdown";
import {
  genreOptions,
  mediaOptions,
  languageOptions,
  runtimeOptions,
  ageFilterOptions,
} from "./OptionSettings";
import Input from "../Form/Input";
import PlatformGrid from "./Platforms/PlatformGrid";
import SuggestionGrid from "./SuggestionGrid";
import { MovieTvContext } from "../Contexts/MovieTvContext";
import { RangeSlider } from "@adobe/react-spectrum";

const Preferences = () => {
  const { formData, setFormData } = useContext(MovieTvContext);
  let [rating, setRating] = useState({ start: 0, end: 100 });

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
  };

  return (
    <Wrapper>
      What do you want to watch today?
      <FormContainer>
        <DropdownBoxes>
          <MediaBox>
            <MediaDropdown
              label="mediaType"
              htmlFor="htmlType"
              selection={formData.mediaType}
              handleChange={handleChange}
              options={mediaOptions}
            />
          </MediaBox>
          <GenreBox>
            <GenreDropdown
              label="genre"
              htmlFor="genre"
              selection={formData.genre}
              handleChange={handleChange}
              options={genreOptions}
            />
          </GenreBox>

          <LanguageBox>
            <LanguageDropdown
              label="language"
              htmlFor="language"
              selection={formData.language}
              handleChange={handleChange}
              options={languageOptions}
            />
          </LanguageBox>
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

          <ReleaseYear>
            <RangeSlider
              label="Release Year"
              minValue={1874}
              maxValue={2021}
              defaultValue={{ start: 1874, end: 2021 }}
              trackGradient={["white", "rgba(177,141,32,1)"]}
              isFilled
            />
          </ReleaseYear>
          <Rating>
            <RangeSlider label="Rating" value={rating} onChange={setRating} />
          </Rating>

          <Price>
            <RangeSlider
              label="Price"
              formatOptions={{ style: "currency", currency: "CAN" }}
              defaultValue={{ start: 0, end: 100 }}
            />
          </Price>
        </DropdownBoxes>
        <FormInput onSubmit={handleClick}>
          Title:
          <TitleInput
            name="title"
            type="text"
            placeholder="Title"
            handleChange={handleChange}
          />
          Director:
          <DirectorInput
            name="director"
            type="text"
            placeholder="Director"
            handleChange={handleChange}
          />
          Cast:
          <CastInput
            name="cast"
            type="text"
            placeholder="Cast"
            handleChange={handleChange}
          />
          <PlatformGrid />
        </FormInput>
        <SubmitButton type="submit">Submit</SubmitButton>
      </FormContainer>
      <SuggestionGridDiv>
        <SuggestionGrid />
      </SuggestionGridDiv>
    </Wrapper>
  );
};

const FormContainer = styled.div``;

const SubmitButton = styled.button`
  background-color: green;
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

const LanguageDropdown = styled(Dropdown)``;
const LanguageBox = styled.div`
  margin-right: 1vw;
`;

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
  border: 5px solid green;
  height: 70vh;
  width: 100%;
`;
const ReleaseYear = styled.div`
  margin-right: 2vw;
  border: 5px solid green;
`;
const Price = styled.div`
  margin-right: 2vw;
  border: 5px solid green;
`;

export default Preferences;
