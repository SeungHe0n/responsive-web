const http = require('http');
const fs = require('fs');
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFile(__dirname + '/index.html'));
    }
    fs.readFile('./' + req.url, function (err, data) {
        if (!err) {
            var dotoffset = req.url.lastIndexOf('.');
            var mimetype =
                dotoffset == -1
                    ? 'text/plain'
                    : {
                          '.html': 'text/html',
                          '.ico': 'image/x-icon',
                          '.jpg': 'image/jpeg',
                          '.png': 'image/png',
                          '.gif': 'image/gif',
                          '.css': 'text/css',
                          '.js': 'text/javascript',
                      }[req.url.substr(dotoffset)];
            res.setHeader('Content-type', mimetype);
            res.end(data);
            console.log(req.url, mimetype);
        } else {
            console.log('file not found: ' + req.url);
            res.writeHead(404, 'Not Found');
            res.end();
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongodb connected!');
});
