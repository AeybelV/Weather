const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var window = null;
var ipc = require('ipc');
var weather = require("Openweather-Node");
var wea = null;
const fs = require("fs");
app.on('ready', function(){
      window = new BrowserWindow({width:800, height:600});
      weather.setAPPID("0b8d62ed8cc7b209a30a9fba64fa4d05");
      window.loadURL("file://"+__dirname+"/weather.html");
      window.setMenu(null);
      console.log("loaded page 'weather'");
      var date;
      var state;
      date = new Date();
      console.log(date);
      if(date.getHours() <= 12 && date.getHours() >= 6){
        state = "morning";
        console.log(state);
      }
      else if(date.getHours() <= 20 && date.getHours() > 12){
        state = "evening";
        console.log(state);

      }
      else if(date.getHours() >=21 && date.getHours() <= 24){
        state = "night";
        console.log(state);
      }
      else if(date.getHours() >= 1 && date.getHours() < 6){
        state = "early morning";
        console.log(state);
      }

      ipc.on('getTemp',function(event, data){
        weather.now("Houston",function(err,wdata){
          if(err) console.log(err);
          else{
            console.log(wdata.getFahrenheitTemp());
            wea = wdata.getFahrenheitTemp()
            event.sender.send('sendTemp',wea);
          }
        })
      });

      window.on("closed", function(){
        window = null;
        app.quit();
        console.log("App Quit");
      });
});
