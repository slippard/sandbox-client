import { Bot } from './bot';

class Dashboard {
    private loginbtn: HTMLInputElement;
    private restartbtn: HTMLInputElement;
    private shutdownbtn: HTMLInputElement;
    private toggle: HTMLInputElement;
    constructor() {
        this.loginbtn = (document.getElementsByClassName('login')[0] as HTMLInputElement);
        this.restartbtn = (document.getElementsByClassName('restart')[0] as HTMLInputElement);
        this.shutdownbtn = (document.getElementsByClassName('shutdown')[0] as HTMLInputElement);
        this.toggle = (document.getElementById('toggle-token') as HTMLInputElement);
        this.loginbtn.addEventListener('click', function (e) {
            e.preventDefault();
            var token = (document.getElementById('token') as HTMLInputElement).value;
            if(token.length == 59) {
                new Bot(token);
            } else {
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
            var x = (document.getElementById("token") as HTMLInputElement);
            if (x.type === "password") {
                x.type = "text";
            } else {
                x.type = "password";
            }
        })
    }

}

new Dashboard();