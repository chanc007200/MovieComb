import React from "react";
import styled from "styled-components";

const PlatformCheckbox = ({
  name,
  type,
  platformName,
  handleChange,
  value,
}) => {
  return (
    <Wrapper>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(ev) => handleChange(ev.target.checked, name)}
      />
      <label htmlFor={name}>{platformName}</label>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default PlatformCheckbox;
