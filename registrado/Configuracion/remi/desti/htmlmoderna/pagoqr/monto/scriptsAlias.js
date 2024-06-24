

document.getElementById("name").innerHTML = DestiNombre1;		
document.getElementById("cuil").innerHTML = DestiCuit;	
document.getElementById("cbu").innerHTML = DestiAlias;


//se trunca si el nombre de billetera es muy largo
var cadena = DestiCuenta;

if (cadena.length <= 29) {
	document.getElementById("billetera").innerHTML = cadena;
	} else {
	
	document.getElementById("billetera").innerHTML = cadena.slice(0, 29) + '...';;
	
}





if(DestiImagen !== "no"){ 
	document.getElementById("imagen").src = DestiImagen; 
}


if(DestiCuenta == "Mercado Pago"){ 
	document.getElementById("imagenLogo").src = "logosWallet/mp.jpg"; 
}
if(DestiCuenta == "Ualá"){ 
	document.getElementById("imagenLogo").src = "logosWallet/ual.jpg"; 
}
if(DestiCuenta == "LEMON"){ 
	document.getElementById("imagenLogo").src = "logosWallet/lem.jpg"; 
}
if(DestiCuenta == "Prex"){ 
	document.getElementById("imagenLogo").src = "logosWallet/pre.jpg"; 
}
if(DestiCuenta == "Brubank"){ 
	document.getElementById("imagenLogo").src = "logosWallet/bru.jpg"; 
}
if(DestiCuenta == "Reba"){ 
	document.getElementById("imagenLogo").src = "logosWallet/re.png"; 
}

if (DestiCuenta.toLowerCase().includes("naranja")) {
    document.getElementById("imagenLogo").src = "logosWallet/nar.png"; 
}  

if (DestiCuenta.toLowerCase().includes("santander")) {
    document.getElementById("imagenLogo").src = "logosWallet/santander.jpg"; 
}  


//para ver si es alias o cbu
function contieneLetra(cadena) {
	for (var i = 0; i < cadena.length; i++) {
		if (cadena.charAt(i).match(/[a-zA-Z]/)) {
			return true;
		}
	}
	return false;
}

if(contieneLetra(DestiAlias)){
	document.getElementById("cc").innerHTML = "Alias:";
	
	}else{
	if(DestiTipo=="Cuenta digital"){
		document.getElementById("cc").innerHTML = "CVU";
		}else{
		
		document.getElementById("cc").innerHTML = "CBU";
	} 
	
	
}






//index.html?titular=Roberto Loco&micuit=27328984542&cbu=000034&nombre=Maria Elena GOnzalez&dni=2816908782&wallet=Mercado Pago&tipo=Cuenta digital&saldo=12563&motivo=varios&monto=0&hora=Actual&urlImg=https://i.ibb.co/Syh2mxj/user2.jpg






document.getElementById("data").addEventListener("click", function () {
const aliasPantalla = document.getElementById('content');
const montoPantalla = document.getElementById('content2');
if (aliasPantalla.style.display === 'block') {
// Si está visible, ocúltala
aliasPantalla.style.display = 'none';
// Muestra la pantalla de Monto
montoPantalla.style.display = 'block';
 
} else {
// Si no está visible, oculta la pantalla de Monto
montoPantalla.style.display = 'none';
// Muestra la pantalla de Alias
aliasPantalla.style.display = 'block';
}

document.getElementById("numberInput").focus();
resetInput();
animateBounce(visor, 300, 1.5);  
});

