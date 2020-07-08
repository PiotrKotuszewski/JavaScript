function validation(){

	const description = document.forms["editForm"]["description"];
	const descriptionPattern = /^[a-zA-Z0-9,.!? ]{10,255}$/;

	const inputBorder = document.querySelectorAll(".input-field");
	const iconBorder = document.querySelectorAll(".icon");
	
	if (!descriptionPattern.test(description.value)){
		document.getElementById("wrongEdit").innerHTML = "Opis musi zawierać od 10 do 255 znaków(liter i cyfr)";
		
		inputBorder[2].style.border = "2px solid red";
		
		iconBorder[2].style.background = "red";
		
		return false;
	}
	
}