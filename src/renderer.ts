import { data } from './config';
import * as mongoose from 'mongoose';
import DUser, { IUser } from './schemas/user';
import * as net from 'net';
import { ipcRenderer, BrowserWindow, remote } from 'electron';
import * as path from "path";
//const remote = require('electron').remote;

export const db = mongoose.connection;

db.on('error', function (err: any) {
    console.log('Error connecting to mongo db: ' + err);
});

db.once('open', function () {
    console.log('Connected to mongo database.');
    (document.getElementsByClassName('status')[0] as HTMLElement).style.background = `green`;
    (document.getElementsByClassName('tooltip')[0] as HTMLElement).innerHTML = `Online`;
})

mongoose.connect(data.dburl, { useNewUrlParser: true });

class Render {
    private userid: HTMLInputElement;
    private loginbtn: HTMLElement;
    constructor() {
        this.loginbtn = document.getElementById('getuser');
        this.userid = (document.getElementById('username') as HTMLInputElement);
        this.loginbtn.addEventListener('click', () => {
            const userid = (document.getElementById('username') as HTMLInputElement).value;
            this.sendCode(userid);
        })
    }

    private sendCode(userid: string) {
        if (userid) {
            DUser.findOne({ userid: userid }, function (err, doc) {
                if (err) return console.log(err);
                if (doc) {

                    try {
                        var socket = net.connect({ host: "localhost", port: 1337 }, function (err: Error) {
                            if (err) return console.log(err);
                            socket.write(`login ${userid}`);
                        });

                        socket.on('data', function (data) {
                            console.log(data.toString());
                            if (data.toString() == 'true') {
                                /* login */
                                ipcRenderer.send('login-message', userid)
                            } else {
                                /* reject */
                                (document.getElementsByClassName('warning')[0] as HTMLElement).style.visibility = `visible`;
                                (document.getElementsByClassName('warning')[0] as HTMLElement).style.opacity = `1`;
                                (document.getElementsByClassName('warning')[0] as HTMLElement).innerHTML = `Not Authorized`;
                            }
                            socket.destroy();
                        });

                        socket.on('close', function () { console.log('close event on tcp client'); });
                    } catch (e) {
                        return alert(e);
                    }
                } else {
                    console.log('no doc found');
                    (document.getElementsByClassName('warning')[0] as HTMLElement).style.visibility = `visible`;
                    (document.getElementsByClassName('warning')[0] as HTMLElement).style.opacity = `1`;
                    (document.getElementsByClassName('warning')[0] as HTMLElement).innerHTML = `User not found`;
                }
            })
        } else {
            console.log('No userid');
            (document.getElementsByClassName('warning')[0] as HTMLElement).style.visibility = `visible`;
            (document.getElementsByClassName('warning')[0] as HTMLElement).style.opacity = `1`;
            (document.getElementsByClassName('warning')[0] as HTMLElement).innerHTML = `Enter your Discord userid to connect.`;
        }
    }
}

new Render();