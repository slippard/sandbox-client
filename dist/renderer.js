"use strict";
exports.__esModule = true;
var config_1 = require("./config");
var mongoose = require("mongoose");
var user_1 = require("./schemas/user");
var net = require("net");
var electron_1 = require("electron");
//const remote = require('electron').remote;
exports.db = mongoose.connection;
exports.db.on('error', function (err) {
    console.log('Error connecting to mongo db: ' + err);
});
exports.db.once('open', function () {
    console.log('Connected to mongo database.');
    document.getElementsByClassName('status')[0].style.background = "green";
    document.getElementsByClassName('tooltip')[0].innerHTML = "Online";
});
mongoose.connect(config_1.data.dburl, { useNewUrlParser: true });
var Render = /** @class */ (function () {
    function Render() {
        var _this = this;
        this.loginbtn = document.getElementById('getuser');
        this.userid = document.getElementById('username');
        this.loginbtn.addEventListener('click', function () {
            var userid = document.getElementById('username').value;
            _this.sendCode(userid);
        });
    }
    Render.prototype.sendCode = function (userid) {
        if (userid) {
            user_1["default"].findOne({ userid: userid }, function (err, doc) {
                if (err)
                    return console.log(err);
                if (doc) {
                    try {
                        var socket = net.connect({ host: "localhost", port: 1337 }, function (err) {
                            if (err)
                                return console.log(err);
                            socket.write("login " + userid);
                        });
                        socket.on('data', function (data) {
                            console.log(data.toString());
                            if (data.toString() == 'true') {
                                /* login */
                                electron_1.ipcRenderer.send('login-message', userid);
                            }
                            else {
                                /* reject */
                                document.getElementsByClassName('warning')[0].style.visibility = "visible";
                                document.getElementsByClassName('warning')[0].style.opacity = "1";
                                document.getElementsByClassName('warning')[0].innerHTML = "Not Authorized";
                            }
                            socket.destroy();
                        });
                        socket.on('close', function () { console.log('close event on tcp client'); });
                    }
                    catch (e) {
                        return alert(e);
                    }
                }
                else {
                    console.log('no doc found');
                    document.getElementsByClassName('warning')[0].style.visibility = "visible";
                    document.getElementsByClassName('warning')[0].style.opacity = "1";
                    document.getElementsByClassName('warning')[0].innerHTML = "User not found";
                }
            });
        }
        else {
            console.log('No userid');
            document.getElementsByClassName('warning')[0].style.visibility = "visible";
            document.getElementsByClassName('warning')[0].style.opacity = "1";
            document.getElementsByClassName('warning')[0].innerHTML = "Enter your Discord userid to connect.";
        }
    };
    return Render;
}());
new Render();
