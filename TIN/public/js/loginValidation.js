function validate() {

	const email = document.forms["loginForm"]["email"];
	const password = document.forms["loginForm"]["password"];
	const inputBorder = document.querySelectorAll(".input-field");
	const iconBorder = document.querySelectorAll(".icon");

	if (email.value.trim() === "") {
		document.getElementById("wrongEmail").innerHTML = "Email nie może byc pusty";
		document.getElementById("wrongPassword").innerHTML = "";
		document.getElementById("wrongLogin").innerHTML = "";

		inputBorder[0].style.border = "2px solid red";
		inputBorder[1].style.border = "";

		iconBorder[0].style.background = "red";
		iconBorder[1].style.background = "dodgerblue";

		return false;
	} else if (password.value.trim() === "") {
		document.getElementById("wrongPassword").innerHTML = "Hasło nie może byc puste";
		document.getElementById("wrongEmail").innerHTML = "";
		document.getElementById("wrongLogin").innerHTML = "";

		inputBorder[0].style.border = "";
		inputBorder[1].style.border = "2px solid red";

		iconBorder[0].style.background = "dodgerblue";
		iconBorder[1].style.background = "red";

		return false;
	}
}

