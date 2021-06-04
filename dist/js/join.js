// const User = require("./schemas/user");

var nickname = document.querySelector("#nickname");
var email = document.querySelector("#email2");
var password = document.querySelector("#password2");

// var btn = document.querySelector("#join-btn");

// btn.onclick = join;

function join() {
    alert("email은 " + email.value + ", password는 " + password.value);
    // const pje = new User({
    //     name: "parkjung",
    //     email: "pje@g.com",
    //     password: "qwerasdf",
    // });
    // pje.save(function (err, pje) {
    //     if (err) return console.error(err);
    // });
}