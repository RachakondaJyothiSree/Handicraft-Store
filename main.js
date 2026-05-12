document.addEventListener('DOMContentLoaded',()=>{

    const sr = ScrollReveal({
        distance:'60px',
        duration:2500,
        delay:400,
        reset:true
    })
    sr.reveal('.text',{delay:200,origin:'top'});
    sr.reveal('.form-container form',{delay:800,origin:'left'});
    sr.reveal('.heading',{delay:800,origin:'top'});
    sr.reveal('.service-container .box',{delay:600,origin:'top'});
    sr.reveal('.products-container .box',{delay:600,origin:'top'});
    sr.reveal('.about-container .about-text',{delay:800,origin:'top'});
    sr.reveal('.reviews-container ',{delay:800,origin:'top'});
    sr.reveal('.newsletter .box',{delay:400,origin:'bottom'});
});
const signInBtn = document.querySelector(".sign-in");
const signUpBtn = document.querySelector(".sign-up");

const loginForm = document.getElementById("auth-form");
const registerForm = document.getElementById("register-form");

signInBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

signUpBtn.addEventListener("click", () => {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
});
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

const loginBox = document.getElementById("auth-form");
const registerBox = document.getElementById("register-form");

showRegister.addEventListener("click", function(e){
    e.preventDefault();       // stops page refresh
    loginBox.style.display = "none";
    registerBox.style.display = "block";
});

showLogin.addEventListener("click", function(e){
    e.preventDefault();
    registerBox.style.display = "none";
    loginBox.style.display = "block";
});