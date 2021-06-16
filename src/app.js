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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/join', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).save(function (err) {
        if (err) return console.error(err);
    });
    res.sendFile(path.join(__dirname, '../static/index.html'));
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, docs) => {
        if (!err) {
            if (docs.password === req.body.password) {
                res.send('로그인에 성공했습니다.');
            } else {
                res.send('로그인에 실패했습니다.');
            }
            res.end();
        } else {
            return console.error(err);
        }
    });
});

app.use(express.static('static'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
