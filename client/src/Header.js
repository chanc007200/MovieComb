import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { UserContext } from "./Contexts/UserContext";
import logo from "./images/Red-Play-Button-PNG-Image.png";
const Header = () => {
  const { userSignedIn, setUserSignedIn } = useContext(UserContext);

  const handleClick = () => {
    sessionStorage.removeItem("SignedInUser");
    setUserSignedIn(null);
  };
  return (
    <Wrapper>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <WebsiteLogo>
          <Logo src={logo} />
          <LogoText>MovieComb</LogoText>
        </WebsiteLogo>
      </NavLink>
      <NavLink to="/Browse" style={{ textDecoration: "none" }}>
        <PreferencesLink>Browse</PreferencesLink>
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
            <WelcomeUser>Welcome {userSignedIn}</WelcomeUser>
            <SignOutDiv onClick={handleClick}>Sign out</SignOutDiv>
          </UserSection>
        </>
      )}
    </Wrapper>
  );
};

const LogoText = styled.div`
  width: 10px;
`;
const Logo = styled.img`
  max-height: 100%;
  width: 20px;
  margin-top: 5px;
`;
const WebsiteLogo = styled.button`
  margin-right: 2vw;
  font-size: 25px;
  margin-left: 10px;
  height: 35px;
  width: 165px;
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5vh;
  position: relative;
  background: black;
  height: 30px;
  font-size: 25px;
  margin-top: 10px;
`;
const PreferencesLink = styled.button`
  margin-right: 2vw;
  font-size: 25px;
`;
const WatchListLink = styled.button`
  margin-right: 2vw;
  font-size: 25px;
`;
const UserSection = styled.div`
  right: 0;
  position: absolute;
  display: flex;
  font-size: 25px;
`;
const SignInDiv = styled.div`
  margin-right: 2vw;
`;
const SignUpDiv = styled.div`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  font-size: 25px;
  cursor: pointer;
`;
const SignOutDiv = styled.div`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;
const WelcomeUser = styled.div`
  margin-right: 15px;
  background-color: transparent;
  border: none;
  font-size: 15px;
  cursor: pointer;
`;
export default Header;
