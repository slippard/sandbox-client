"use strict";
exports.__esModule = true;
var bot_1 = require("./bot");
var Dashboard = /** @class */ (function () {
    function Dashboard() {
        this.loginbtn = document.getElementsByClassName('login')[0];
        this.restartbtn = document.getElementsByClassName('restart')[0];
        this.shutdownbtn = document.getElementsByClassName('shutdown')[0];
        this.toggle = document.getElementById('toggle-token');
        this.loginbtn.addEventListener('click', function (e) {
            e.preventDefault();
            var token = document.getElementById('token').value;
            if (token.length == 59) {
                new bot_1.Bot(token);
            }
            else {
                alert('Please provide a vaid token.');
            }
        });
        this.restartbtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Restart');
        });
        this.shutdownbtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('shutdown');
        });
        this.toggle.addEventListener('click', function (e) {
            var x = document.getElementById("token");
            if (x.type === "password") {
                x.type = "text";
            }
            else {
                x.type = "password";
            }
        });
    }
    return Dashboard;
}());
new Dashboard();
//# sourceMappingURL=dashboard.js.map