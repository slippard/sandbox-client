import { data } from './config';
import * as mongoose from 'mongoose';

export const db = mongoose.connection;

db.on('error', function (err: any) {
    console.log('Error connecting to mongo db: ' + err);
});

db.once('open', function () {
    console.log('Connected to mongo database.');
})


mongoose.connect(data.dburl, { useNewUrlParser: true }).then(() => (document.getElementsByClassName('status')[0] as HTMLElement).style.background = `green`);

class Render {
    constructor() {
        console.log('Render process started on login page.');
    }
}

new Render();