var nickname = document.querySelector("#nickname");
var email = document.querySelector("#email");
var password = document.querySelector("#password");

var btn = document.querySelector("#join-btn");

btn.onclick = join;

function join(){
    alert('email은 '+email.value+', password는 '+password.value);
}