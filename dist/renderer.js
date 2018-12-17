"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var mongoose = require("mongoose");
exports.db = mongoose.connection;
exports.db.on('error', function (err) {
    console.log('Error connecting to mongo db: ' + err);
});
exports.db.once('open', function () {
    console.log('Connected to mongo database.');
});
mongoose.connect(config_1.data.dburl, { useNewUrlParser: true }).then(function () { return document.getElementsByClassName('status')[0].style.background = "green"; });
var Render = /** @class */ (function () {
    function Render() {
        console.log('Render process started on login page.');
    }
    return Render;
}());
new Render();
