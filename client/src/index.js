import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MovieTvProvider } from "./Contexts/MovieTvContext";
import { UserProvider } from "./Contexts/UserContext";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MovieTvProvider>
        <App />
      </MovieTvProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
