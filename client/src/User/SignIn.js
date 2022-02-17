import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../Contexts/UserContext";
import Input from "../Form/Input";
import { useHistory } from "react-router";
import { MovieTvContext } from "../Contexts/MovieTvContext";
const SignIn = () => {
  const [signInUserFormData, setSignInUserFormData] = useState({
    userName: "",
    userPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { userSignedIn, setUserSignedIn } = useContext(UserContext);
  const { myWatchList, setMyWatchList } = useContext(MovieTvContext);
  let history = useHistory();
  const handleChange = (value, name) => {
    setSignInUserFormData({ ...signInUserFormData, [name]: value });
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (
      signInUserFormData.userPassword !== "" &&
      signInUserFormData.userName !== ""
    ) {
      const settings = {
        method: "POST",
        body: JSON.stringify(signInUserFormData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/users/login", settings);
      const data = await response.json();

      if (data.status === 500 || data.status === 401 || data.status === 400) {
        setErrorMessage(data.data);
      } else {
        setUserSignedIn(data.data);
        sessionStorage.setItem("SignedInUser", JSON.stringify(data.data));
        setUpWatchList(data.data);
        history.push("/");
      }
    } else {
      setErrorMessage("Need to fill all inputs");
    }
  };

  const setUpWatchList = async (userId) => {
    try {
      const response = await fetch(`/watchList/${userId}`);
      const body = await response.json();

      setMyWatchList(body.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <FormDiv>
          <FormNameDiv>
            <FormName>Username:</FormName>
            <NameInput
              name="userName"
              type="text"
              handleChange={handleChange}
              required
            />
          </FormNameDiv>
          <FormPasswordDiv>
            <FormPassword>Password:</FormPassword>
            <PasswordInput
              name="userPassword"
              type="text"
              handleChange={handleChange}
              required
            />
          </FormPasswordDiv>
          <ConfirmButton type="submit">CONFIRM</ConfirmButton>
          <ErrorMessageBox>{errorMessage}</ErrorMessageBox>
        </FormDiv>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const FormNameDiv = styled.div`
  display: flex;
`;
const NameInput = styled(Input)``;
const FormName = styled.div``;
const FormPasswordDiv = styled.div`
  display: flex;
`;
const PasswordInput = styled(Input)``;
const FormPassword = styled.div``;
const ConfirmButton = styled.button`
  height: 50px;
  width: 200px;
  background-color: darkorange;
  color: white;
`;
const ErrorMessageBox = styled.div`
  height: 50px;
  width: 200px;
  font-size: 17px;
`;
const FormContainer = styled.form``;
const FormDiv = styled.div`
  display: inline-block;
  margin-right: 30px;
  text-align: right;
`;
export default SignIn;
