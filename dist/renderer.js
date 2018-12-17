"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var mongoose = require("mongoose");
var user_1 = require("./schemas/user");
var net = require("net");
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
        var _this = this;
        this.loginbtn = document.getElementById('getuser');
        this.userid = document.getElementById('username');
        this.loginbtn.addEventListener('click', function () {
            var userid = document.getElementById('username').value;
            _this.sendCode(userid);
        });
        console.log('Render process started on login page.');
    }
    Render.prototype.sendCode = function (userid) {
        if (userid) {
            user_1["default"].findOne({ userid: userid }, function (err, doc) {
                if (err)
                    return console.log(err);
                if (doc) {
                    var socket = net.connect({ port: 1337 }, function () {
                        socket.write("login " + userid);
                    });
                    socket.on('data', function (data) {
                        console.log(data.toString());
                        socket.destroy();
                    });
                    socket.on('close', function () { console.log('close event on tcp client'); });
                }
                else {
                    console.log('no doc found');
                }
            });
        }
        else {
            console.log('No userid');
        }
    };
    return Render;
}());
new Render();
