import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MovieProvider } from "./Contexts/MovieContext";
ReactDOM.render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
