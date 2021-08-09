const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./db');
const User = require('./schemas/user');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
db();

app.get('/', (req, res) => {
    if (req.cookies[0] != null) {
        console.log('cookies: ', req.cookies);
        res.sendFile(path.join(__dirname, '../static/index-logined.html'));
    } else {
        console.log('null value');
        res.sendFile(path.join(__dirname, '../static/index.html'));
    }
});

app.post('/join', (req, res) => {
    User.findOne({ email: req.body.email }, (err, docs) => {
        if (!err) {
            if (docs === null) {
                const user = new User({
                    email: req.body.email,
                    password: req.body.password,
                }).save(function (err) {
                    if (err) return console.error(err);
                });
                res.sendFile(path.join(__dirname, '../static/index.html'));
            } else {
                res.send('이미 존재하는 이메일입니다.');
                res.end();
            }
        } else {
            return console.error(err);
        }
    });
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, docs) => {
        if (!err) {
            if (docs.password === req.body.password) {
                res.cookie(req.body.email, req.body.password);
                res.redirect('/');
                // res.send('로그인에 성공했습니다.');
            } else {
                res.send('이메일 혹은 비밀번호가 틀렸습니다.');
            }
            res.end();
        } else {
            return console.error(err);
        }
    });
});

app.get('/logout', (req, res) => {
    res.write('<script>const logout = confirm(\'정말 로그아웃하시겠습니까?\');');

    res.write('</script>');
    // res.write('if(logout === true){')
    // const logout = confirm('로그아웃하시겠습니까?');
    // if (logout === true) {
    //     alert(document.cookie);
    //     // document.cookie.clear
    // } else {
    //     window.location.href = '/';
    //     // redirect
    // }
    // res.sendFile(path.join(__dirname, '../static/js/logout.js'));
    res.end();
});

app.use(express.static('static'));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
