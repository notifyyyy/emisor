window.addEventListener('goBack', function () {
	window.history.back();
});



function validarLongitud(input) {
    if (input.value.length > 22) {
        input.value = input.value.slice(0, 22); // Limita la longitud a 22 caracteres
    }
}


$(document).ready(function() {
	
    var $ul = $('#favorite-links');
    var $RemiNombre = $('#nombre');
    var $RemiCuit = $('#cuit');
    var $RemiCbu = $('#cbu');
    var $RemiSaldo = $('#saldo');
    var $RemiMotivo = $('#motivo');
	
    
	
	
	
	//LINK
    $ul.on('click', 'li a', function(event) {
		
		if ($('#HoraCancel').is(':visible')) {
			var hora = $('#horaInput').val() + ":" +  $('#minutosInput').val();
			} else {
			var hora = "Actual" 
		}
		
        event.preventDefault(); // Prevenir la acción predeterminada del enlace
        var etiqueta = $(this).parent().data('etiqueta');
        var entryData = JSON.parse(localStorage.getItem("remi_" + etiqueta));
		
        var RemiNombre = entryData.RemiNombre;
        var RemiCuit = entryData.RemiCuit;
        var RemiCbu = entryData.RemiCbu;
        var RemiSaldo = entryData.RemiSaldo;
        var RemiMotivo = entryData.RemiMotivo;
		
		window.open("desti/destinatario.html?RemiNombre=" + RemiNombre + "&RemiCuit=" + RemiCuit + "&RemiCbu=" + RemiCbu + "&RemiSaldo=" + RemiSaldo + "&RemiMotivo=" + RemiMotivo + "&hora=" + hora, "_self");
	});
	
    //get items from local storage
    if (localStorage.getItem('remi_vk-links')) {
        $ul.html(localStorage.getItem('remi_vk-links'));
	}
    
	// add new item
	$('#add').click(function() {
		var RemiNombre = $RemiNombre.val();
		var RemiCuit = $RemiCuit.val();
		var RemiCbu = $RemiCbu.val();
		var RemiSaldo = $RemiSaldo.val();
		var RemiMotivo = $RemiMotivo.val();
		
		
		 
		
		
		var entryHTML = '<li data-etiqueta="' + RemiNombre + '">' + 
		'<a>' + RemiNombre + '</a>' +
		'<button class="removebtn">X</button><i id="ver" class="fa-solid fa-magnifying-glass"></i>' +
		'</li>';
		
		// Save the entry data to localStorage
		var entryData = {
			RemiNombre: RemiNombre,
			RemiCuit: RemiCuit,
			RemiCbu: RemiCbu,
			RemiSaldo: RemiSaldo,
			RemiMotivo: RemiMotivo 
		};
		localStorage.setItem("remi_"+RemiNombre, JSON.stringify(entryData));
		
		// Add the entry to the list
		$ul.append(entryHTML);
		
		// Save changes to localStorage
		localStorage.setItem('remi_vk-links', $ul.html());
		
		// Reset the form
		$RemiNombre.val('');
		$RemiCuit.val('');
		$RemiCbu.val('');
		$RemiSaldo.val('');
		$RemiMotivo.val('');
		
		
		$("#add-link-form").slideToggle("100");
	});
	
	// Remove item
	$ul.on('click', '.removebtn', function() {
	    var confirmar = confirm("¿Estás seguro de que deseas eliminar esta entrada?");
		
		if (confirmar) {
			var etiqueta = $(this).parent().data('etiqueta');
			localStorage.removeItem("remi_" + etiqueta);
			$(this).parent().remove();
			// Save changes to localStorage
			localStorage.setItem('remi_vk-links', $ul.html());
		}  
	 	
	});
	
	// Form toggle
	$("#new-link-button").click(function() {
		$("#add-link-form").slideToggle("100");
	});
	
	// Cancelar
	$("#cancel").click(function() {
		$("#add-link-form").hide();
	});
	
	
	// Agregar un evento clic para el botón "Ver"
	$ul.on('click', '#ver', function() {
		var etiqueta = $(this).parent().data('etiqueta');
		var entryData = JSON.parse(localStorage.getItem("remi_" + etiqueta));
		
		// Rellenar los campos de detalles de entrada con los datos almacenados
		$("#RemiNombre-detail").val(entryData.RemiNombre);
		$("#RemiCuit-detail").val(entryData.RemiCuit);
		$("#RemiCbu-detail").val(entryData.RemiCbu);
		$("#RemiSaldo-detail").val(entryData.RemiSaldo);
	$("#RemiMotivo-detail").val(entryData.RemiMotivo);
	
	
	// Mostrar el formulario de detalles de entrada y ocultar otros elementos
	$("#entry-details").show();
	
	});
	
	
	
	// Agregar un evento clic para el botón "Guardar"
	$("#guardar").click(function() {
	var etiqueta = $("#RemiNombre-detail").val();
	
	// Actualizar los datos de la entrada en el localStorage
	var entryData = {
	RemiNombre: $("#RemiNombre-detail").val(),
	RemiCuit: $("#RemiCuit-detail").val(),
	RemiCbu: $("#RemiCbu-detail").val(),
	RemiSaldo: $("#RemiSaldo-detail").val(),
	RemiMotivo: $("#RemiMotivo-detail").val(),
	
	};
	localStorage.setItem("remi_" + etiqueta, JSON.stringify(entryData));
	
	
	
	
	$("#entry-details").hide(); 
	});
	
	$("#cerrar").click(function() {
	$("#entry-details").hide();
	});
	
	
	
	
	// Seleccionar todo el texto en el input cuando recibe el foco
	$('input').on('focus', function() {
	$(this).select();
	});	
	
	$(document).ready(function() {
	$('#HoraCancel').hide();
	var $horaActivar = $('#HoraActivar');		
	var $horaInput = $('#horaInput');
	var $minutosInput = $('#minutosInput');
	
	
	// Al hacer clic en el div "hora", habilitar los campos de entrada
	$horaActivar.click(function() {
	$horaInput.prop('disabled', false);
	$minutosInput.prop('disabled', false);
	$('#horaInput, #minutosInput').css('background-color', "#92db83");
	$('#HoraActivar').hide();
	$('#HoraCancel').show();
	
	});
	
	
	$('#HoraCancel').click(function() {
	$horaInput.prop('disabled', true);
	$minutosInput.prop('disabled', true);
	$horaInput.css('background-color', "white");
	$minutosInput.css('background-color', "white");
	$('#HoraCancel').hide();
	$('#HoraActivar').show();
	$horaInput.val(''); // Limpiar el valor
	$minutosInput.val(''); // Limpiar el valor
	});
	
	
	
	
	});
	
	
	});
		