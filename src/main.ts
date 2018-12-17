import { ipcMain, app, BrowserWindow } from "electron";
import * as path from "path";
import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
let mainWindow: Electron.BrowserWindow;
let dash: Electron.BrowserWindow;

myEmitter.on('logging-in', () => {
  openDashboard();
  mainWindow.close();
});

ipcMain.on('login-message', (event: any, arg: any) => {
  myEmitter.emit('logging-in');
})

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 600,
    autoHideMenuBar: true,
    resizable: false,
  });
  mainWindow.loadFile(path.join(__dirname, "../index.html"));

  mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function openDashboard() {
  dash = new BrowserWindow({
    height: 800,
    width: 1000,
    autoHideMenuBar: true,
    resizable: false,
  });
  dash.loadFile(path.join(__dirname, "../dashboard.html"));

  dash.on("closed", () => {
    dash = null;
  });
}