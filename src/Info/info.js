const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var window = null;
const fs = require("fs");
var util = require("util");
var http = require("http");
app.on("ready", function(){
  window = new BrowserWindow({width:800, height:600});
  window.loadURL("file://"+__dirname+"/index.html");
  window.setMenu(null);
  console.log("File Loaded");



  window.on("closed", function(){
    window = null;
    app.quit();
    console.log("App Quit");
  });
});
