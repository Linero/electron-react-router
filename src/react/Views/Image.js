import React from "react";

const { electron } = window;
const ipcRenderer = electron.ipcRenderer;

class Image extends React.Component {
  state = {
    imageUrl: ""
  };

  componentDidMount() {
    ipcRenderer.on("image", (event, arg) => {
      this.setState({
        imageUrl: arg
      });
      console.log(this.state.imageUrl);
    });
  }

  render() {
    return (
      <img
        src={this.state.imageUrl}
        alt="fdg!"
        style={{ maxWidth: "100%" }}
        width="100%"
      />
    );
  }
}

export default Image;
