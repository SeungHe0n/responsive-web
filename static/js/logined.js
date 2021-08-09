const logout = document.querySelector(".logout");

logout.addEventListener('click', event => {
    const out = confirm('로그아웃하시겠습니까?');
    if(out === true){
        alert(document.cookie);
        // document.cookie.clear
    }else{
        window.location.href = '/';
        // redirect
    }
});