var pag = "1";


// JavaScript para manejar los eventos
document.getElementById("show-form-button").addEventListener("click", function () {
	document.getElementById("encabeza").src = "lonja.jpg";
	document.getElementById("div2").style.display = "none";
	document.getElementById("div3").style.display = "none";
	document.getElementById("back-arrow").style.display = "block";
	document.getElementById("add-account-text").style.display = "block";
	document.getElementById("account-input").style.display = "block";
	document.getElementById("continue-button").style.display = "block";
	document.getElementById("account-input").focus();
	pag = "2";
});

document.getElementById("hide-form-button").addEventListener("click", function () {
	document.getElementById("encabeza").src = "enca.jpg";
	document.getElementById("div2").style.display = "block";
	document.getElementById("div3").style.display = "block";
	document.getElementById("back-arrow").style.display = "none";
	document.getElementById("add-account-text").style.display = "none";
	document.getElementById("account-input").style.display = "none";
	document.getElementById("continue-button").style.display = "none";
	pag = "1";
});


var notaDiv = document.getElementById("nota");
var ale = document.getElementById("alert");
var textField=document.getElementById("account-input");


document.getElementById("account-input").addEventListener("input", function () {
	const inputValue = this.value;
	const continueButton = document.getElementById("continue-button");
	if (inputValue.length >= 6) {
		continueButton.classList.add("active");
		} else {
		continueButton.classList.remove("active");
	}
	
    if (inputValue.length > 0) {
		document.getElementById("nota").style.display = "block";
		} else {
		document.getElementById("nota").style.display = "none";
	}
	
	
	
	if (/[^A-Za-z0-9.]/.test(inputValue)) {
        notaDiv.style.color = "red";
        notaDiv.textContent = "Revisá ese dato";
        continueButton.classList.remove("active");
		textField.style.borderColor = "red";
		ale.style.display = "block";
		} else {
        notaDiv.style.color = ""; // Restablece el color a su estado original
		textField.style.borderColor = "#047ae1";
		ale.style.display = "none";
		
        notaDiv.textContent = "Ingresá el CBU, CVU o alias";
        if (inputValue.length >= 6) {
            continueButton.classList.add("active");
			} else {
            continueButton.classList.remove("active");
		}
	}
	
});

 





const accountInput = document.getElementById("account-input");
const continueButton = document.getElementById("continue-button");
// Agrega un evento click al botón "Continuar"
continueButton.addEventListener("click", function () {
    // Obtén el valor del campo de entrada y conviértelo a minúsculas
    const inputValue = accountInput.value.toLowerCase();
	
    // Convierte el valor de la variable CBU a minúsculas
    const ali = DestiAlias.toLowerCase();
	const cvu = DestiCbuDest;
    // Compara las dos cadenas en minúsculas
    if (inputValue === ali || inputValue === cvu) {
        window.open("monto/monto.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&DestiNombre1=" + DestiNombre1 + "&DestiNombre2=" + DestiNombre2 + "&DestiAlias=" + DestiAlias + "&DestiCbuDest=" + DestiCbuDest + "&DestiCuit=" + DestiCuit + "&DestiCuenta=" + DestiCuenta + "&DestiTipo=" + DestiTipo + "&DestiImagen=" + DestiImagen + "&monto=0" + "&hora=" + hora + "&TresCod=" + TresCod, '_self');	
		} else {
		notaDiv.style.color = "red";
        notaDiv.textContent = "Revisá ese dato";
        continueButton.classList.remove("active");
		textField.style.borderColor = "red";
		ale.style.display = "block";
		document.getElementById("account-input").focus();
	}
});

// AVANZAR CON ENTER
accountInput.addEventListener('keyup', function(event) {
   
  if (event.keyCode === 13) {
    
    continueButton.click();
  }
});



 

window.addEventListener('goBack', function () {
	if(pag == "1"){
		window.history.back();
		}else{
		document.getElementById("encabeza").src = "enca.jpg";
		document.getElementById("div2").style.display = "block";
		document.getElementById("div3").style.display = "block";
		document.getElementById("back-arrow").style.display = "none";
		document.getElementById("add-account-text").style.display = "none";
		document.getElementById("account-input").style.display = "none";
		document.getElementById("continue-button").style.display = "none";
		pag = "1";
	}
});




function detectarClick(event) {
    // Obtener la posición del clic dentro de la imagen
    const ima = document.getElementById("encabeza");
    const rect = ima.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Determinar si el clic ocurrió en la parte izquierda o derecha de la imagen
    const anchoImagen = rect.width;
    const mitadImagen = anchoImagen / 2;

    if (x < mitadImagen) {
        window.history.back();
    } else {
        
        window.open("monto/monto.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&DestiNombre1=" + DestiNombre1 + "&DestiNombre2=" + DestiNombre2 + "&DestiAlias=" + DestiAlias + "&DestiCbuDest=" + DestiCbuDest + "&DestiCuit=" + DestiCuit + "&DestiCuenta=" + DestiCuenta + "&DestiTipo=" + DestiTipo + "&DestiImagen=" + DestiImagen + "&monto=0" + "&hora=" + hora + "&TresCod=" + TresCod, '_self');
         
    }
}





 
