import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Profile from "./Profile/index";
import Header from "./Header";
import Homepage from "./Homepage/index";
import GlobalStyles from "./Styles/GlobalStyles";
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
          <Route exact path="/Profile">
            <Profile />
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
