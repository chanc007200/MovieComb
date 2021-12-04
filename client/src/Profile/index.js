import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Dropdown from "./Component/Dropdown";
const Profile = () => {
  return (
    <Wrapper>
      What do you want to watch today?
      <GenreSection>
        <Dropdown />
      </GenreSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
  color: white;
  width: 100vw;
  height: 100vh;
`;
const GenreSection = styled.div``;
export default Profile;
