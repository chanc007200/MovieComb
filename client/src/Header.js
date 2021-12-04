import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <WebsiteLogo>MovieComb</WebsiteLogo>
    </Wrapper>
  );
};
const WebsiteLogo = styled.div``;
const Wrapper = styled.div`
  background-color: black;
  color: red;
  width: 100vw;
  height: 5vh;
  margin: 0;
`;
export default Header;
