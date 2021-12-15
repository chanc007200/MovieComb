import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
const Header = () => {
  const { userSignedIn, setUserSignedIn } = useContext(UserContext);

  const handleClick = () => {
    sessionStorage.removeItem("SignedInUser");
    setUserSignedIn(null);
  };
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
      {userSignedIn === null ? (
        <UserSection>
          <NavLink to="/SignIn" style={{ textDecoration: "none" }}>
            <SignInDiv>Sign In </SignInDiv>
          </NavLink>
          <NavLink to="/SignUp" style={{ textDecoration: "none" }}>
            <SignUpDiv>Sign Up</SignUpDiv>
          </NavLink>
        </UserSection>
      ) : (
        <>
          <UserSection>
            Welcome {userSignedIn}
            <SignOutDiv onClick={handleClick}>Sign out</SignOutDiv>
          </UserSection>
        </>
      )}
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
  border: 5px solid red;
  position: relative;
`;
const PreferencesLink = styled.div`
  margin-right: 2vw;
`;
const WatchListLink = styled.div`
  margin-right: 2vw;
`;
const UserSection = styled.div`
  right: 0;
  position: absolute;
  display: flex;
`;
const SignInDiv = styled.div`
  margin-right: 2vw;
`;
const SignUpDiv = styled.div``;
const SignOutDiv = styled.div`
  margin-left: 15px;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;
export default Header;
