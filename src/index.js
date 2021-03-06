import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./react/assets/bootstrap-4.3.1-dist/css/bootstrap.css";
import App from "./react/Views/App";
import ViewManager from "./router";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<ViewManager />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
