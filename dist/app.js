const http = require('http');
var fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hello, World!\n');
  var url = req.url;
  if(req.url == '/'){
    url = '/index.html';
  }
  if(req.url == '/favicon.ico'){
    return res.writeHead(404);
  }
  res.writeHead(200);
  res.end(fs.readFileSync(__dirname + url));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("mongodb connected!");
});