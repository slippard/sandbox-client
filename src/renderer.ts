import { data } from './config';
import * as mongoose from 'mongoose';
import DUser, { IUser } from './schemas/user';
import * as net from 'net';

export const db = mongoose.connection;

db.on('error', function (err: any) {
    console.log('Error connecting to mongo db: ' + err);
});

db.once('open', function () {
    console.log('Connected to mongo database.');
})


mongoose.connect(data.dburl, { useNewUrlParser: true }).then(() => (document.getElementsByClassName('status')[0] as HTMLElement).style.background = `green`);

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

        console.log('Render process started on login page.');
    }

    private sendCode(userid: string) {
        if (userid) {
            DUser.findOne({ userid: userid }, function (err, doc) {
                if (err) return console.log(err);
                if (doc) {
                    var socket = net.connect({ port: 1337 }, function () {
                        socket.write(`login ${userid}`);
                    });
                    
                    socket.on('data', function(data){
                        console.log(data.toString());
                        socket.destroy();
                    });
                    
                    socket.on('close', function(){ console.log('close event on tcp client');});
                } else {
                    console.log('no doc found');
                }
            })
        } else {
            console.log('No userid');
        }
    }
}

new Render();