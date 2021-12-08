import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Preferences from "./Preferences/index";
import Header from "./Header";
import Homepage from "./Homepage/index";
import GlobalStyles from "./Styles/GlobalStyles";
import WatchList from "./WatchList/index";
import ErrorPage from "./ErrorPage";
import MovieById from "./Movie/MovieById";
function App() {
  return (
    <Wrapper>
      <Router>
        <GlobalStyles />
        <HeaderStyled />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/preferences">
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

const HeaderStyled = styled(Header)`
  display: flex;
  flex-direction: column;
`;
export default App;
