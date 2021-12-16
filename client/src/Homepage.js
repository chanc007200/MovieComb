import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MyWatchList from "./WatchListPage/MyWatchList";
import Input from "./Form/Input";
const { REACT_APP_API_KEY } = process.env;
require("dotenv").config();

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const handleChange = () => {};
  const handleClick = async () => {
    console.log(searchQuery);
    // try {
    //   await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${searchQuery}`, {
    //     method: "GET",
    //     headers: {
    //       "x-rapidapi-host": "imdb8.p.rapidapi.com",
    //       "x-rapidapi-key": REACT_APP_API_KEY,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
    // } catch (err) {
    //   console.error(err.stack);
    // }
  };
  return (
    <Wrapper>
      {sessionStorage.getItem("SignedInUser") ? (
        <MyWatchList />
      ) : (
        <StartButtonDiv>
          <p>Welcome to MovieComb!</p>
          <p>Create your own watchlist from your preferences.</p>
          <p>
            Keep track of all the tv shows and movies that you are watching.
          </p>
          <NavLink to="/Browse">
            <StartButton>Let's get started</StartButton>
          </NavLink>
        </StartButtonDiv>
      )}
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
const Searchbar = styled(Input)``;
const SearchContainer = styled.div`
  display: flex;
`;
const FormInput = styled.form``;
const SubmitButton = styled.button`
  background-color: green;
`;
export default Homepage;
