window.addEventListener('goBack', function () {
	window.history.back();
});


function validarLongitud(input) {
	if (input.value.length > 22) {
		input.value = input.value.slice(0, 22); // Limita la longitud a 22 caracteres
	}
}

$(document).ready(function () {

	var TresCod = ""; //tres primeros del cod comprobante

	var $ul = $('#favorite-links');
	var $etiqueta = $('#etiqueta');
	var $nombre1 = $('#nombre1');
	var $nombre2 = $('#nombre2');
	var $alias = $('#alias');
	var $cbuDest = $('#cbuDest');
	var $cuit2 = $('#cuit2');
	var $cuenta = $('#cuenta');
	var $tipo = $('#tipo');
	var $imageUrl = $('#imageUrl');



	//LINK
	$ul.on('click', 'li a', function (event) {



		event.preventDefault(); // Prevenir la acción predeterminada del enlace
		var etiqueta = $(this).parent().data('etiqueta');
		var entryData = JSON.parse(localStorage.getItem("desti_" + etiqueta));

		var DestiNombre1 = entryData.nombre1;
		var DestiNombre2 = entryData.nombre2;
		var DestiAlias = entryData.alias;
		var DestiCbuDest = entryData.cbuDest;
		var DestiCuit = entryData.cuit2;
		var DestiCuenta = entryData.cuenta;
		var DestiTipo = entryData.tipo;
		var DestiImagen = entryData.imageUrl;


		window.open("htmlmoderna/index.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&DestiNombre1=" + DestiNombre1 + "&DestiNombre2=" + DestiNombre2 + "&DestiAlias=" + DestiAlias + "&DestiCbuDest=" + DestiCbuDest + "&DestiCuit=" + DestiCuit + "&DestiCuenta=" + DestiCuenta + "&DestiTipo=" + DestiTipo + "&DestiImagen=" + DestiImagen + "&monto=0" + "&hora=" + hora + "&TresCod=" + TresCod, "_self");
	});

	//get items from local storage
	if (localStorage.getItem('desti_vk-links')) {
		$ul.html(localStorage.getItem('desti_vk-links'));
	}

	// add new item
	$('#add').click(function () {
		var etiqueta = $etiqueta.val();
		var nombre1 = $nombre1.val();
		var nombre2 = $nombre2.val();
		var alias = $alias.val();
		var cbuDest = $cbuDest.val();
		var cuit2 = $cuit2.val();
		var cuenta = $cuenta.val();
		var tipo = $tipo.val();
		var imageUrl = $imageUrl.val();

		//window.open("https://mp-moderna.vercel.app/index.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&DestiNombre1=" + DestiNombre1 + "&DestiNombre2=" + DestiNombre2 + "&DestiAlias=" + DestiAlias + "&DestiCbuDest=" + DestiCbuDest + "&DestiCuit=" + DestiCuit + "&DestiCuenta=" + DestiCuenta + "&DestiTipo=" + DestiTipo + "&DestiImagen=" + DestiImagen + "&monto=0" + "&hora=" + hora);
		// Construct the entry HTML
		var entryHTML = '<li data-etiqueta="' + etiqueta + '">' +
			'<a>' + etiqueta + '</a>' +
			'<button class="removebtn">X</button><i id="ver" class="fa-solid fa-magnifying-glass"></i>' +
			'</li>';

		// Save the entry data to localStorage
		var entryData = {
			etiqueta: etiqueta,
			nombre1: nombre1,
			nombre2: nombre2,
			alias: alias,
			cbuDest: cbuDest,
			cuit2: cuit2,
			cuenta: cuenta,
			tipo: tipo,
			imageUrl: imageUrl
		};
		localStorage.setItem("desti_" + etiqueta, JSON.stringify(entryData));

		// Add the entry to the list
		$ul.append(entryHTML);

		// Save changes to localStorage
		localStorage.setItem('desti_vk-links', $ul.html());

		// Reset the form
		$etiqueta.val('');
		$nombre1.val('');
		$nombre2.val('');
		$alias.val('');
		$cbuDest.val('');
		$cuit2.val('');
		$cuenta.val('Mercado Pago');
		$tipo.val('Cuenta digital');
		$imageUrl.val('no');

		$("#add-link-form").slideToggle("100");
	});

	// Remove item
	$ul.on('click', '.removebtn', function () {
		var confirmar = confirm("¿Estás seguro de que deseas eliminar esta entrada?");

		if (confirmar) {
			var etiqueta = $(this).parent().data('etiqueta');
			localStorage.removeItem("desti_" + etiqueta);
			$(this).parent().remove();
			// Save changes to localStorage
			localStorage.setItem('desti_vk-links', $ul.html());
		}

	});

	// Form toggle
	$("#new-link-button").click(function () {
		$("#add-link-form").slideToggle("100");
	});

	// Cancelar
	$("#cancel").click(function () {
		$("#add-link-form").hide();
	});


	// Agregar un evento clic para el botón "Ver"
	$ul.on('click', '#ver', function () {
		var etiqueta = $(this).parent().data('etiqueta');
		var entryData = JSON.parse(localStorage.getItem("desti_" + etiqueta));

		// Rellenar los campos de detalles de entrada con los datos almacenados
		$("#etiqueta-detail").val(entryData.etiqueta);
		$("#nombre1-detail").val(entryData.nombre1);
		$("#nombre2-detail").val(entryData.nombre2);
		$("#alias-detail").val(entryData.alias);
		$("#cbuDest-detail").val(entryData.cbuDest);
		$("#cuit2-detail").val(entryData.cuit2);
		$("#cuenta-detail").val(entryData.cuenta);
		$("#tipo-detail").val(entryData.tipo);
		$("#imageUrl-detail").val(entryData.imageUrl);

		// Mostrar el formulario de detalles de entrada y ocultar otros elementos
		$("#entry-details").show();

	});



	// Agregar un evento clic para el botón "Guardar"
	$("#guardar").click(function () {
		var etiqueta = $("#etiqueta-detail").val();

		// Actualizar los datos de la entrada en el localStorage
		var entryData = {
			etiqueta: $("#etiqueta-detail").val(),
			nombre1: $("#nombre1-detail").val(),
			nombre2: $("#nombre2-detail").val(),
			alias: $("#alias-detail").val(),
			cbuDest: $("#cbuDest-detail").val(),
			cuit2: $("#cuit2-detail").val(),
			cuenta: $("#cuenta-detail").val(),
			tipo: $("#tipo-detail").val(),
			imageUrl: $("#imageUrl-detail").val()
		};
		localStorage.setItem("desti_" + etiqueta, JSON.stringify(entryData));

		// Deshabilitar la edición de campos
		$("#nombre1-detail").prop('disabled', true);
		$("#nombre2-detail").prop('disabled', true);
		$("#alias-detail").prop('disabled', true);
		$("#cbuDest-detail").prop('disabled', true);
		$("#cuit2-detail").prop('disabled', true);
		$("#cuenta-detail").prop('disabled', true);
		$("#tipo-detail").prop('disabled', true);
		$("#imageUrl-detail").prop('disabled', true);

		$("#entry-details").hide();
	});

	$("#cerrar").click(function () {
		$("#entry-details").hide();
	});



	// Seleccionar todo el texto en el input cuando recibe el foco
	$('input').on('focus', function () {
		$(this).select();
	});




	guardarEnCookie();
	// TRES PRIMEROS DIGITOS DEL COMPROBANTE, SE GUARDAN EN COOKIE
	function guardarEnCookie() {
		var inputValue = document.getElementById("miInput").value;

		// Guardar el valor en una cookie con nombre "miValor"
		document.cookie = "miValor=" + inputValue;
		TresCod = inputValue;

	}

	// Función para obtener el valor de la cookie
	function obtenerValorDeCookie() {
		var cookies = document.cookie.split(";");

		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();

			// Buscar la cookie con nombre "miValor"
			if (cookie.startsWith("miValor=")) {
				var valor = cookie.substring("miValor=".length);
				document.getElementById("miInput").value = valor;
				TresCod = valor;
				return;
			}
		}
	}

	$('#saveCod').click(function () {
		guardarEnCookie();
	});
	obtenerValorDeCookie();


});
