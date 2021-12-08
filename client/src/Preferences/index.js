import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Dropdown from "./Component/Dropdown";
import {
  genreOptions,
  mediaOptions,
  languageOptions,
  runtimeOptions,
  ageFilterOptions,
} from "./OptionSettings";
import Input from "./Component/Input";
import PlatformGrid from "./Component/Platforms/PlatformGrid";

const Preferences = () => {
  const [formData, setFormData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [genres, setGenres] = useState([]);
  const [genreLoadedStatus, setGenreLoadedStatus] = useState(false);
  const handleChange = (value, name) => {
    // setFormData({...FormData,[name]:value});
    // setErrMessage("");
  };

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await fetch("/getGenres");
        const body = await response.json();
        setGenres(body.data);

        setGenreLoadedStatus(true);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);
  return (
    <Wrapper>
      What do you want to watch today?
      <DropdownBoxes>
        <MediaDropdown
          label="mediaType"
          htmlFor="htmlType"
          //selection{}
          //   handleChange={handleChange}
          options={mediaOptions}
        />
        {genreLoadedStatus && (
          <GenreBox>
            <PreferencesTitle>Pick a genre:</PreferencesTitle>
            <select onChange={handleChange} defaultValue="Select a genre">
              <option value="Select a genre" disabled>
                Select a genre
              </option>
              {genres.map((genre) => (
                <option>{genre}</option>
              ))}
            </select>
          </GenreBox>
        )}
        <LanguageBox>
          <PreferencesTitle>Pick a language:</PreferencesTitle>
          <LanguageDropdown
            label="language"
            htmlFor="language"
            //selection{}
            //   handleChange={handleChange}
            options={languageOptions}
          />
        </LanguageBox>
        <RunTimeBox>
          <PreferencesTitle>Pick a runtime:</PreferencesTitle>
          <RunTimeDropdown
            label="runtime"
            htmlFor="runtime"
            //selection{}
            //   handleChange={handleChange}
            options={runtimeOptions}
          />
        </RunTimeBox>
        <AgeFilterBox>
          <PreferencesTitle>Pick an age filter:</PreferencesTitle>
          <AgeFilterDropdown
            label="ageFilter"
            htmlFor="ageFilter"
            //selection{}
            //   handleChange={handleChange}
            options={ageFilterOptions}
          />
        </AgeFilterBox>
      </DropdownBoxes>
      <FormInput>
        Title:
        <TitleInput
          name="title"
          type="text"
          placeholder="Title"
          //   handleChange={handleChange}
        />
        Director:
        <DirectorInput
          name="director"
          type="text"
          placeholder="Director"
          //   handleChange={handleChange}
        />
        Cast:
        <CastInput
          name="cast"
          type="text"
          placeholder="Cast"
          //   handleChange={handleChange}
        />
        <PlatformGrid />
      </FormInput>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;
const GenreBox = styled.div`
  display: flex;
`;

const GenreDropdown = styled(Dropdown)``;

const MediaDropdown = styled(Dropdown)``;

const LanguageDropdown = styled(Dropdown)``;
const LanguageBox = styled.div`
  display: flex;
`;
const PreferencesTitle = styled.div`
  font-weight: bold;
`;

const RunTimeBox = styled.div`
  display: flex;
`;
const RunTimeDropdown = styled(Dropdown)``;

const AgeFilterBox = styled.div`
  display: flex;
`;
const AgeFilterDropdown = styled(Dropdown)``;

const FormInput = styled.div``;
const TitleInput = styled(Input)``;
const DirectorInput = styled(Input)``;
const CastInput = styled(Input)``;

const DropdownBoxes = styled.div`
  display: flex;
`;
export default Preferences;
