const { app, BrowserWindow, ipcMain } = require("electron");
const { channels } = require("../src/shared/constants");
const path = require("path");
const url = require("url");
const isDev = true;
let mainWindow;
let imageWindow;
function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html?app"),
      protocol: "file:",
      slashes: true
    });

  const imageWindowUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html?image"),
      protocol: "file:",
      slashes: true
    });

  const startUrlTest = isDev
    ? "http://localhost:3000?app"
    : `file://${path.join(__dirname, "../build/index.html?app")}`;

  const imageWindowUrlTest = isDev
    ? "http://localhost:3000?image"
    : `file://${path.join(__dirname, "../build/index.html?image")}`;

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  imageWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    },
    parent: mainWindow,
    show: false
  });

  mainWindow.loadURL(startUrlTest);
  imageWindow.loadURL(imageWindowUrlTest);
  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  imageWindow.on("close", e => {
    e.preventDefault();
    imageWindow.hide();
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, event => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion()
  });
});

ipcMain.on("toggle-image", (event, arg) => {
  console.log("toggle-image!");
  imageWindow.show();
  imageWindow.webContents.send("image", arg);
});

ipcMain.on("toggle-settings", (e, arg) => {
  //settingsWindow.isVisible() ? settingsWindow.hide() : settingsWindow.show();
});
