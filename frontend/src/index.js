import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import reportWebVitals from "./reportWebVitals";
import jwtDecode from "jwt-decode";

if (localStorage.getItem("jwt")) {
  const decode = jwtDecode(localStorage.getItem("jwt"));
  //to logout the user once the token expires we do this
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //logout user
    localStorage.removeItem("jwt");
    //redirect to login screen
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
