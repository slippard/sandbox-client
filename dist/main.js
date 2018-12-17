"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var events_1 = require("events");
var MyEmitter = /** @class */ (function (_super) {
    __extends(MyEmitter, _super);
    function MyEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MyEmitter;
}(events_1.EventEmitter));
var myEmitter = new MyEmitter();
var mainWindow;
var dash;
myEmitter.on('logging-in', function () {
    openDashboard();
    mainWindow.close();
});
electron_1.ipcMain.on('login-message', function (event, arg) {
    myEmitter.emit('logging-in');
});
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 600,
        autoHideMenuBar: true,
        resizable: false
    });
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", function () {
        mainWindow = null;
    });
}
function openDashboard() {
    dash = new electron_1.BrowserWindow({
        height: 800,
        width: 1000,
        autoHideMenuBar: true,
        resizable: false
    });
    dash.loadFile(path.join(__dirname, "../dashboard.html"));
    dash.on("closed", function () {
        dash = null;
    });
}
