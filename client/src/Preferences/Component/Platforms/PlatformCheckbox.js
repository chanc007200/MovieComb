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
      <label htmlFor={name}>{platformName}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(ev) => handleChange(ev.target.value, name)}
        checked
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default PlatformCheckbox;
