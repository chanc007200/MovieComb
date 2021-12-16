import React from "react";
import styled from "styled-components";

const Dropdown = ({ label, htmlFor, selection, handleChange, options }) => {
  return (
    <Wrapper>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        value={selection}
        onChange={(ev) => handleChange(ev.target.value, htmlFor)}
      >
        {options.map((option) => (
          <>
            {option.value !== "undefined" ? (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ) : (
              <option key={option.value} value={option.value} disabled>
                {option.label}
              </option>
            )}
          </>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 6px;

  label {
    display: none;
  }

  select {
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    color: black;
    font-size: 15px;
    font-weight: bold;
    height: 40px;
    width: 200px;
  }

  option {
    background: #fff;
    color: black;
  }
`;

export default Dropdown;
