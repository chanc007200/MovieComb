import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Homepage = () => {
  return (
    <Wrapper>
      <StartButtonDiv>
        <NavLink to="/preferences">
          <p>We will get your preferences.</p>
          <p>Generate your own watchlist from your preferences</p>
          <p>
            Allow you to manage a list of recommendation and your own personal
            watchlist
          </p>
          <StartButton>Let's get started</StartButton>
        </NavLink>
      </StartButtonDiv>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
`;
const StartButton = styled.button`
  text-align: center;
  background-color: grey;
`;
const StartButtonDiv = styled.div`
  margin: auto;
`;
export default Homepage;
