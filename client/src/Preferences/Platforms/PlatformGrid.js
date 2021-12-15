import React from "react";
import styled from "styled-components";
import PlatformCheckbox from "./PlatformCheckbox";
import { platformOptions } from "../OptionSettings";
const PlatformGrid = () => {
  return (
    <Wrapper>
      {platformOptions?.map((platform) => {
        return (
          <>
            <PlatformCheckbox
              name={platform.label}
              label={platform.label}
              platformName={platform.label}
              type="checkbox"
              value={platform.value}
              //     onChange={(ev) => handleChange(ev.target.value, platform)}
            />
          </>
        );
      })}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
`;
const PlatformDiv = styled.div``;
export default PlatformGrid;
