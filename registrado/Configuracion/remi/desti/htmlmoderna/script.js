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
	${imagen !== "no" ? `<img src="${imagen}" alt="" width="33%" height="auto" style="border-radius: 50%; margin-left: -8%; margin-right:-3%;">` : `
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
			
			window.open('movimientos/comprob/comprob.html?titular=' + titular + '&micuit=' + micuit +'&cbu=' + cbu + '&nombre=' + entrada.nombre + '&dni=' + entrada.cuit + '&wallet=' + entrada.billetera + '&tipo=' + tipo + '&saldo='+ saldo +'&motivo=' + motivo + '&monto=' + entrada.monto + "&fecha=" + entrada.fecha + "&codT=" + entrada.codigo + "&urlImg=" + imagen + "&TresCod=" + TresCod, '_self');	
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
	window.open("movimientos/movimientos.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&DestiNombre1=" + DestiNombre1 + "&DestiNombre2=" + DestiNombre2 + "&DestiAlias=" + DestiAlias + "&DestiCbuDest=" + DestiCbuDest + "&DestiCuit=" + DestiCuit + "&DestiCuenta=" + DestiCuenta + "&DestiTipo=" + DestiTipo + "&DestiImagen=" + DestiImagen + "&monto=0" + "&hora=" + hora + "&TresCod=" + TresCod, '_self');
	
	}
	
	
	
	
	
	
	function agregarActividades() {
	
	
	// Crea un nuevo elemento div
	var newDiv = document.createElement('div');
	
	// Agrega el contenido HTML al nuevo elemento div
	newDiv.innerHTML = `
	
	
	<div style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 8%;">
	<div id="izq">
	<span id="ico"><b>ML</b></span>
	<div id="izqText">
	<span style="display: block ruby;">Transferencia enviada</span>
	<span style="font-size:13px; color:gray">a Macos Javier Lopez</span>
	</div>
	</div>
	
	<div id="der">
	
	<div id="izqText">
	<span>-$25.500,00</span> 
	<span style="font-size:13px; color:gray;text-align: right;">Ayer</span>
	</div>
	</div>
	</div>	
	
	
	<div style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 8%;">	
	
	<div id="izq">
	<span id="ico"><b>SV</b></span>
	<div id="izqText">
	<span style="display: block ruby;">Transferencia recibida</span>
	<span style="font-size:13px; color:gray">a Sofia Antonella Vergara</span>
	</div>
	</div>
	
	<div id="der">
	
	<div id="izqText">
	<span style="color: green;">+$4.500,00</span> 
	<span style="font-size:13px; color:gray;text-align: right;">Miércoles</span>
	</div>
	</div>
	
	</div>
	
	<div style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 8%;">
	
	<div id="izq">
	<img id="icoIMG" src="logos/ypf.png"></img>
	<div id="izqText">
	<span style="display: block ruby;">Pago con QR          </span>
	<span style="font-size:13px; color:gray">YPF</span>
	</div>
	</div>
	
	<div id="der">
	
	<div id="izqText" style="text-align: right;">
	<span style="color: black;">-$2.000,05</span> 
	<span data-dias="2" style="font-size:13px; color:gray;text-align: right;">Miércoles</span>
	</div>
	</div>
	
	</div>
	
	
	
	`;
	
	// Obtén el elemento en el que deseas insertar el nuevo div
	var parentElement = document.getElementById('transferencias');
	
	// Agrega el nuevo div como hijo del elemento padre
	parentElement.appendChild(newDiv);
	
	}		