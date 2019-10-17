import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./react/Views/App";
import Image from "./react/Views/Image";
import Settings from "./react/Views/Settings";

class ViewManager extends Component {
  static Views() {
    return {
      app: <App />,
      image: <Image />,
      settings: <Settings />
    };
  }
  static View(props) {
    let name = props.location.search.substr(1);
    console.log(name);
    let view = ViewManager.Views()[name];
    if (view == null) throw new Error("View '" + name + "' is undefined");
    return view;
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={ViewManager.View} />
        </div>
      </Router>
    );
  }
}
export default ViewManager;
