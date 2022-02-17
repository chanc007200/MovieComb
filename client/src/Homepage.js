import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MyWatchList from "./WatchListPage/MyWatchList";
require("dotenv").config();

const Homepage = () => {
  return (
    <Wrapper>
      {sessionStorage.getItem("SignedInUser") ? (
        <Container>
          <StyledMyWatchList />
        </Container>
      ) : (
        <>
          <StartButtonDiv>
            <p>Welcome to MovieComb!</p>
            <p>Create your own watchlist from your preferences.</p>
            <p>
              Keep track of all the tv shows and movies that you are watching.
            </p>
            <NavLink to="/Filter">
              <StartButton>Let's get started</StartButton>
            </NavLink>
          </StartButtonDiv>
        </>
      )}
    </Wrapper>
  );
};
const Container = styled.div`
  height: 300px;
`;
const StyledMyWatchList = styled(MyWatchList)``;
const TextDiv = styled.div``;
const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;
`;
const StartButton = styled.button`
  text-align: center;
  background-color: green;
  margin-top: 50px;
  height: 100px;
  width: 300px;
`;
const StartButtonDiv = styled.div`
  margin: auto;
  font-size: 20px;
  text-align: center;
`;

export default Homepage;
