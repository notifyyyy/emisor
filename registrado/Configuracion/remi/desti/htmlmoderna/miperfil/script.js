var pant = "1";

var backButton = document.getElementById("img1"); 

backButton.addEventListener("click", function() { 
	if(pant == "1"){
		window.history.back(); 
	}else{
	    Volver(); 
	}
	
	
});

window.addEventListener('goBack', function () {
	window.history.back();
});

 
 



function Volver(){
    const pantalla1 = document.getElementById('nombremail');
	const pantallaId = document.getElementById('identidad');
	pantalla1.style.display = 'block';
	document.getElementById('img2').style.display = 'block';
	document.getElementById('img3').style.display = 'block';
	pantallaId.style.display = 'none';
	document.getElementById("img1").src ="img1.jpg"
	pant = "1";
}