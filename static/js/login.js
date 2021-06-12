var email = document.querySelector('#email');
var password = document.querySelector('#password');

function login() {
    alert('email은 ' + email.value + ', password는 ' + password.value);
    const pje = new User({
        name: 'parkjung',
        email: 'pje@g.com',
        password: 'qwerasdf',
    });
    pje.save(function (err, pje) {
        if (err) return console.error(err);
    });
}
