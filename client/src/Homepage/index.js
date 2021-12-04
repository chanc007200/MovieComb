import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Homepage = () => {
  return (
    <Wrapper>
      <StartButtonDiv>
        <NavLink to="/profile">
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
`;
const StartButtonDiv = styled.div`
  margin: auto;
`;
export default Homepage;
