var backButton = document.getElementById("img1");

// Agregar un evento de clic al botón
backButton.addEventListener("click", function() {
	// Regresar a la página anterior
	window.history.back();
});

window.addEventListener('goBack', function () {
	window.history.back();
});


var backButton = document.getElementById("img2");

// Agregar un evento de clic al botón
backButton.addEventListener("click", function() {
	// Regresar a la página anterior
	window.history.back();
});


function agregarNuevaEntrada(monto, nombre, fecha, imagen, numeroEntrada) {
    // Crear un nuevo elemento div para la nueva entrada
    var nuevaEntrada = document.createElement("div");
    nuevaEntrada.setAttribute("style", "display: flex; justify-content: space-between;align-items: center;margin-bottom: 8%;");
    nuevaEntrada.setAttribute("data-id", numeroEntrada); // Agregar el atributo data-id
	
	//obtener inciiales del nombre
	const palabras = nombre.split(' ');
	let iniciales = '';
	
	if (palabras.length > 0) {
		iniciales += palabras[0][0].toUpperCase();
	}
	
	if (palabras.length > 1) {
		iniciales += palabras[palabras.length - 1][0].toUpperCase();
	}
	
	var inicial = iniciales.slice(0, 2);
	
	// Verifica si la cadena termina en un punto
	if (inicial.endsWith('.')) {
		// Si termina en punto, quita el punto y agrega un espacio en blanco
		inicial = " " + inicial.slice(0, -1) + '. ';
	 
		
		} 
	
	
	
	
	
	
    var partes = fecha.split(" - ");
    var fechaCorta = partes[0];
    // Contenido de la nueva entrada
	var contenidoNuevo = `
    <div id="izq" onclick="irAcomprob()">
	${imagen !== "no" ? `<img src="${imagen}" alt="" width="44" height="44" style="border-radius: 50%; margin-left: 15px; margin-right: 10px;">` : `
	<span id="ico"><b>${inicial}</b></span>`}
	<div id="izqText">
	<span style="display: block ruby;">Transferencia enviada</span>
	<span style="font-size:13px; color:gray">a ${nombre}</span>
	</div>
    </div>
    <div id="der" style="text-align: right;">
	<div id="izqText">
	<span style="color: #424040;">-$${monto},00</span>
	<span style="font-size:13px; color:gray;text-align: right;">${fechaCorta}</span>
</div>
</div>
`;


// Insertar el contenido en la nueva entrada
nuevaEntrada.innerHTML = contenidoNuevo;

// Obtener el contenedor de entradas existentes
var contenedorEntradas = document.getElementById("transferencias");

// Insertar la nueva entrada al principio del contenedor
contenedorEntradas.insertBefore(nuevaEntrada, contenedorEntradas.firstChild);

// Agregar un controlador de eventos click al elemento de entrada
nuevaEntrada.addEventListener("click", function () {
	// Obtener el número de entrada almacenado en el atributo data-id
	var numeroEntrada = nuevaEntrada.getAttribute("data-id");
	
	// Obtener la entrada actual del localStorage utilizando el número de entrada
	var entradaJSON = localStorage.getItem("entrada_" + numeroEntrada);
	
	// Comprobar si la entrada existe
	if (entradaJSON) {
		// Convertir la entrada JSON en un objeto JavaScript
		var entrada = JSON.parse(entradaJSON);
		
		// Aquí puedes acceder a los datos de la entrada y realizar acciones con ellos
		console.log("Número de entrada: " + numeroEntrada);
		console.log("Nombre: " + entrada.nombre);
		console.log("Monto: " + entrada.monto);
		console.log("motivo: " + entrada.motivo);
		
		window.open('comprob/comprob.html?RemiNombre=' + entrada.Rnombre + '&RemiCuit=' + entrada.Rcuit + "&RemiCbu=" + entrada.Rcbu +'&DestiCbuDest=' + entrada.cbu + '&DestiNombre1=' + entrada.nombre + "&DestiNombre2=" + entrada.nombreComp + '&DestiAlias='  + DestiAlias + '&DestiCuit=' + entrada.cuit + '&DestiCuenta=' + entrada.billetera + '&DestiTipo=' + entrada.tipo + '&RemiSaldo='+ RemiSaldo +'&RemiMotivo=' + entrada.motivo + '&monto=' + entrada.monto + "&hora=" + entrada.fecha + "&codT=" + entrada.codigo + "&DestiImagen=" + DestiImagen + "&TresCod=" + TresCod + "&TempRemiNombre=" + RemiNombre  + "&TempRemiCuit=" + RemiCuit  + "&TempRemiCbu=" + RemiCbu + "&TempDestiNombre1=" + DestiNombre1 + "&TempDestiNombre2=" + DestiNombre2 + "&TempDestiCuit=" + DestiCuit +"&TempDestiCbuDest=" + DestiCbuDest + "&TempDestiCuenta=" + DestiCuenta + "&TempDestiTipo=" + DestiTipo + "&TempRemiMotivo=" + RemiMotivo, '_self');	
	}
});
}

 
// Obtener el número máximo de entradas desde el contador
var maxEntradas = localStorage.length;

// Recorrer todas las entradas existentes
for (var i = 1; i <= maxEntradas; i++) {
    // Obtener la entrada actual del localStorage
    var entradaJSON = localStorage.getItem("entrada_" + i);
	
    // Comprobar si la entrada existe (puede haber huecos si se eliminan)
    if (entradaJSON) {
        // Convertir la entrada JSON en un objeto JavaScript
        var entrada = JSON.parse(entradaJSON);
		
        // Llamar a la función para agregar la entrada a la lista
        agregarNuevaEntrada(entrada.monto, entrada.nombre,entrada.fecha,entrada.urlimg, i);
		
	}
}	


function irAcomprob(){
	//window.open('comprob/comprob.html?titular=' + titular + '&micuit=' + micuit +'&cbu=' + cbu + '&nombre=' + nombre + '&dni=' + dni + '&wallet=' + wallet + '&tipo=' + tipo + '&saldo='+ saldo +'&motivo=' + motivo + '&monto=' + monto + "&hora=" + hora, '_self');	
	
}	