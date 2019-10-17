import React from "react";
import logo from "../assets/images/logo.svg";
import "./css/App.css";
import Axios from "axios";

const { electron } = window;
const ipcRenderer = electron.ipcRenderer;
const Menu = electron.remote.Menu;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.showImage = this.showImage.bind(this);
  }
  state = {
    posts: []
  };

  showImage(image) {
    //var event = new Event("togglle-image");
    //window.dispatchEvent(event);
    console.log("work");
    ipcRenderer.send("toggle-image", image);
  }

  componentDidMount() {
    this.initMenu();
    Axios.get("https://www.reddit.com/r/aww.json")
      .then(response => {
        this.setState({
          posts: response.data.data.children
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  initMenu() {
    const menu = Menu.buildFromTemplate([
      {
        label: "File",
        submenu: [
          {
            label: "New Window",
            accelerator: "CmdOrCtrl+,",
            click: () => {
              ipcRenderer.send("toggle-settings");
            }
          },
          { type: "separator" },
          {
            label: "Quit",
            accelerator: "CmdOrCtrl+Q"
          }
        ]
      },
      {
        label: "Edit",
        submenu: [
          { label: "Menu Item 1" },
          { label: "Menu Item 2" },
          { label: "Menu Item 3" }
        ]
      }
    ]);
    Menu.setApplicationMenu(menu);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ul className="list-group">
          {this.state.posts.map(post => {
            return (
              <li
                key={post.data.id}
                className="list-group-item flex-container"
                onClick={() => {
                  console.log(post);
                  this.showImage(post.data.url);
                }}
              >
                <img
                  src={post.data.thumbnail}
                  alt="thumb"
                  className="thumbnail"
                />
                <div>{post.data.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
