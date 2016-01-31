var gulp = require("gulp");
var childspawn = require("child_process");
gulp.task("default", function(){
childspawn.exec("electron .");
});
