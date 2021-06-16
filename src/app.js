const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');
const User = require('./schemas/user');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

db();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../static/index.html'));
});
app.get('/login', (req, res) => {
    const pje = new User({
        name: 'parkjung',
        email: 'pje@g.com',
        password: 'qwerasdf',
    });
    pje.save(function (err, pje) {
        if (err) return console.error(err);
    });
    res.end();
});

app.use(express.static('static'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
