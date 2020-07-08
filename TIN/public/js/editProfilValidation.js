function usernameValidation() {
    const email = document.forms["editUsername"]["wrongEmail"];
    const pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;

    if (!pattern.test(email.value)) {
        document.getElementById("emailSpan").innerHTML = "Niepoprawny adres email";
        document.getElementById("usernameSpan").innerHTML = "";

        return false;
    }
}