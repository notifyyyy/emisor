var vez=0;

const imagenHuella = document.getElementById("clickHuella");

imagenHuella.addEventListener("click", function() {
	if(vez==0){	
		document.getElementById('miOverlay').style.display = 'flex';
		document.getElementById('center').style.display = 'flex';
		vez=1;
	}
});  



let body = document.querySelector('body');
let fingerprint = document.querySelector('.fingerprint');
let center = document.querySelector('.center');
let scan = document.querySelector('.scan');
let timer, timerSuccess;




function onSuccess() {
	body.removeEventListener('mousedown', onTouchStart);
	body.removeEventListener('touchstart', onTouchStart);
	
	fingerprint.classList.remove('active');
	//center.classList.add('success');	
	clearTimeout(timerSuccess);
	document.getElementById('miOverlay').style.display = 'none';
	document.querySelector('.center').style.display = 'none';
	
	
	timerSuccess = setTimeout(() => {
		body.addEventListener('mousedown', onTouchStart);
		body.addEventListener('touchstart', onTouchStart);
		
		//center.classList.remove('success');
	}, 3000);
	}
	
	// Agrega estas líneas al principio para seleccionar el elemento de la aureola
	const aureola = document.querySelector('.aureola');
	
	// ...
	
	function onTouchStart() {
		fingerprint.classList.add('active');
		aureola.style.transform = 'scale(1)'; // Muestra la aureola
		timer = setTimeout(onSuccess, 2000);
	}
	
	function onTouchEnd() {
		fingerprint.classList.remove('active');
		aureola.style.transform = 'scale(0)'; // Oculta la aureola
		clearTimeout(timer);
	}
	
	body.addEventListener('mousedown', onTouchStart);
	body.addEventListener('touchstart', onTouchStart);
	body.addEventListener('mouseup', onTouchEnd);
	body.addEventListener('touchend', onTouchEnd);	