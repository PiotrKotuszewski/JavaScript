function discoveryValidation(){
	const discoveryName = document.forms["addForm"]["name"];
	const url = document.forms["addForm"]["url"];
	const description = document.forms["addForm"]["description"];


	const inputBorder = document.querySelectorAll(".input-field");
	const iconBorder = document.querySelectorAll(".icon");

	const namePattern = /^[a-zA-Z0-9,.!? ]{10,60}$/;
	const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	const descriptionPattern = /^[a-zA-Z0-9,.!? ]{10,255}$/;

	
	if (!namePattern.test(discoveryName.value)){
		document.getElementById("discoverySpan").innerHTML = "Znalezisko musi zawierać od 10 do 60 znaków(liter i cyfr)";
		document.getElementById("urlSpan").innerHTML = "";
		document.getElementById("descSpan").innerHTML = "";
		
		inputBorder[0].style.border = "2px solid red";
		inputBorder[1].style.border = "";
		inputBorder[2].style.border = "";
		
		iconBorder[0].style.background = "red";
		iconBorder[1].style.background = "dodgerblue";
		iconBorder[2].style.background = "dodgerblue";
		
		return false;
	}else if(url.value.trim() === ""){
		document.getElementById("discoverySpan").innerHTML = "";
		document.getElementById("urlSpan").innerHTML = "Adres url nie może być pusty";
		document.getElementById("descSpan").innerHTML = "";
		
		inputBorder[0].style.border = "";
		inputBorder[1].style.border = "2px solid red";
		inputBorder[2].style.border = "";
		
		iconBorder[0].style.background = "dodgerblue";
		iconBorder[1].style.background = "red";
		iconBorder[2].style.background = "dodgerblue";
		
		return false;
	}else if (!urlPattern.test(url.value)){
		document.getElementById("discoverySpan").innerHTML = "";
		document.getElementById("urlSpan").innerHTML = "Niepoprawny adres url";
		document.getElementById("descSpan").innerHTML = "";
		
		inputBorder[0].style.border = "";
		inputBorder[1].style.border = "2px solid red";
		inputBorder[2].style.border = "";
		
		iconBorder[0].style.background = "dodgerblue";
		iconBorder[1].style.background = "red";
		iconBorder[2].style.background = "dodgerblue";
		
		return false;
	}else if (!descriptionPattern.test(description.value)){
		document.getElementById("discoverySpan").innerHTML = "";
		document.getElementById("urlSpan").innerHTML = "";
		document.getElementById("descSpan").innerHTML = "Opis musi zawierać od 10 do 255 znaków(liter i cyfr)";
		
		inputBorder[0].style.border = "";
		inputBorder[1].style.border = "";
		inputBorder[2].style.border = "2px solid red";
		
		iconBorder[0].style.background = "dodgerblue";
		iconBorder[1].style.background = "dodgerblue";
		iconBorder[2].style.background = "red";
		
		return false;
	}
}