var backButton = document.getElementById("img1");

// Agregar un evento de clic al botón
backButton.addEventListener("click", function() { 
	window.history.back();
});

window.addEventListener('goBack', function () {
	window.history.back();
});


 