import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <Wrapper>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <WebsiteLogo>MovieComb</WebsiteLogo>
      </NavLink>
      <NavLink to="/Preferences" style={{ textDecoration: "none" }}>
        <PreferencesLink>Preferences</PreferencesLink>
      </NavLink>
      <NavLink to="/Watchlist" style={{ textDecoration: "none" }}>
        <WatchListLink>WatchList</WatchListLink>
      </NavLink>
    </Wrapper>
  );
};
const WebsiteLogo = styled.div`
  margin-right: 2vw;
`;
const Wrapper = styled.div`
  color: red;
  display: flex;
  margin-bottom: 5vh;
`;
const PreferencesLink = styled.div`
  margin-right: 2vw;
`;
const WatchListLink = styled.div`
  margin-right: 2vw;
`;
export default Header;
