import React from "react";
import styled from "styled-components";
import PlatformCheckbox from "./PlatformCheckbox";

const PlatformGrid = () => {
  const tempPlatformArray = ["Netflix", "Amazon", "Disney+"];
  return (
    <Wrapper>
      {tempPlatformArray?.map((platform) => {
        return (
          <>
            <PlatformCheckbox
              name={platform}
              label={platform}
              type="checkbox"
              platformName={platform}
              value={platform}
              //     onChange={(ev) => handleChange(ev.target.value, platform)}
            />
          </>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const PlatformDiv = styled.div``;
export default PlatformGrid;
