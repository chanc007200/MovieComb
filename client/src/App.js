import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Preferences from "./Preferences/index";
import Header from "./Header";
import Homepage from "./Homepage";
import WatchList from "./WatchListPage/index";
import ErrorPage from "./ErrorPage";
import MovieById from "./MovieById";
import GlobalStyles from "./GlobalStyles";
function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Router>
        <HeaderStyled />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/Preferences">
            <Preferences />
          </Route>
          <Route exact path="/WatchList">
            <WatchList />
          </Route>
          <Route exact path="/Movie/:movieId">
            <MovieById />
          </Route>
          <Route path="">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderStyled = styled(Header)``;
export default App;
