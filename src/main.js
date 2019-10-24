const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require("path");
const url = require("url");
const express = require("express");
const extensionServer = express();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { webSecurity: false, nodeIntegration: true }
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", function() {
  createWindow();
  startServer();
});

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

function startServer() {
  extensionServer.use(express.json());
  extensionServer.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // chrome-extension://ajmlddlkjihjgnnphnjkhoceahpjcfae
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if ("OPTIONS" === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  extensionServer.get("/ping", function(req, res) {
    console.log("got ping!");
    res.send("pong");
  });

  extensionServer.post("/picks", function(req, res) {
    let receivedPicks = [];
    req.body.forEach(function(pick) {
      receivedPicks.push(pick);
    });

    receivedPicks.sort((a, b) => (a.pick > b.pick ? 1 : -1));
    console.log("Received picks from extension");
    mainWindow.webContents.send("onReceivedPicks", receivedPicks);
    res.send("Ok");
  });

  var server = extensionServer.listen(8787, function() {
    console.log("Listening...");
  });
}
