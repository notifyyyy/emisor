 
 

 
if(hora=="Actual"){
	hora = fechaActual.toLocaleString('es-AR', options); 
}
 

CrearEntrada();


function CrearEntrada(){
	 
	var contadorEntradas = parseInt(localStorage.getItem("contadorEntradas")) || 0;
	
	// Incrementar el contador para la próxima entrada
	contadorEntradas++;
	
	var nuevaEntrada = {
	    
		nombre: DestiNombre1,
		nombreComp: DestiNombre2,
		codigo: codT,
		monto: monto,
		fecha: fechaFormateada + " - " + hora + " hs",
		cbu: DestiCbuDest,
		cuit: DestiCuit,
		motivo: RemiMotivo,
		tipo: DestiTipo,
		billetera: DestiCuenta,
		urlimg: DestiImagen,
		Rnombre:RemiNombre,
		Rcuit: RemiCuit,
		Rcbu: RemiCbu
		
	};
	
	
	localStorage.setItem("entrada_" + contadorEntradas, JSON.stringify(nuevaEntrada));
	
	
	localStorage.setItem("contadorEntradas", contadorEntradas.toString());	
	
	
}



