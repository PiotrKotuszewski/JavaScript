
function registerValidation() {
    const email = document.forms["registerForm"]["email"];
    const username = document.forms["registerForm"]["username"];
    const password = document.forms["registerForm"]["password"];
    const inputBorder = document.querySelectorAll(".input-field");
    const iconBorder = document.querySelectorAll(".icon");
    const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    const loginPattern = /^[a-zA-Z0-9]{3,16}$/;

    if (!loginPattern.test(username.value)){
        document.getElementById("usernameError").innerHTML = "Login musi mieć od 4 do 35 znaków, może zawierać małe i duże litery, cyfry, i zaczynać się od litery lub cyfry";
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("passwordSpan").innerHTML = "";


        inputBorder[0].style.border = "2px solid red";
        inputBorder[1].style.border = "";
        inputBorder[2].style.border = "";

        iconBorder[0].style.background = "red";
        iconBorder[1].style.background = "dodgerblue";
        iconBorder[2].style.background = "dodgerblue";

        return false;
    }else if(!pattern.test(email.value)) {
        document.getElementById("emailError").innerHTML = "Niepoprawny adres email";
        document.getElementById("usernameError").innerHTML = "";
        document.getElementById("passwordSpan").innerHTML = "";

        inputBorder[0].style.border = "";
        inputBorder[1].style.border = "2px solid red";
        inputBorder[2].style.border = "";

        iconBorder[0].style.background = "dodgerblue";
        iconBorder[1].style.background = "red";
        iconBorder[2].style.background = "dodgerblue";

        return false;
    }else if (!passwordPattern.test(password.value)){
        document.getElementById("passwordSpan").innerHTML = "Hasło musi posiadać co najmniej 6 znaków, dużą litere, małą litere i cyfre"
        document.getElementById("emailError").innerHTML = "";
        document.getElementById("usernameError").innerHTML = "";
        inputBorder[0].style.border = "";
        inputBorder[1].style.border = "";
        inputBorder[2].style.border = "2px solid red";

        iconBorder[0].style.background = "dodgerblue";
        iconBorder[1].style.background = "dodgerblue";
        iconBorder[2].style.background = "red";

        return false;
    }
}