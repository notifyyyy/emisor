

fetch('https://serviciosfur.glitch.me/datos')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    document.getElementById("titu").textContent = data.titular;
    document.getElementById("pag").textContent = data.pagina;
    document.getElementById("alias").textContent = data.alias;
    document.getElementById("correo").textContent = data.email;
    document.getElementById("crearCuenta").setAttribute('href', data.pagina + "/pagoMp.html");

  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });

$('body').on('focus', 'input', function () {
  $(this).parent().addClass('focus'); 
  document.getElementById("tab-svelte").style.top = "10rem";
});

$('body').on('blur', 'input', function () {
  if (!$(this).val().length > 0) {
    $(this).parent().removeClass('focus');
    document.getElementById("tab-svelte").style.top = "0rem";
  }
});


 

$(document).ready(function () {
  checkVisit();

  $('#continuar').on('click', function () {
    document.getElementById("barraCarga").style.display = "block";
    consultarDNI($('#dni').val());
  });
  
  var dniInput = document.getElementById('dni');
   dniInput.addEventListener('keypress', function(e) {
        // Verifica si la tecla presionada es Enter (código 13)
        if (e.key === 'Enter' || e.keyCode === 13) {
          document.getElementById("barraCarga").style.display = "block";
        consultarDNI($('#dni').val());
        }
    });

  $('#entendido').on('click', function () {
    document.getElementById("alerta").style.display = "none";
  });
});

$('body').on('blur', 'input', function () {
   
  if (!$(this).val().length > 0) {
    $(this).parent().removeClass('focus');
  }
});



async function consultarDNI(dni) {

  try {
    const response = await fetch(`https://dni-impact.glitch.me/api/consulta/${dni}`);
    if (!response.ok) {
      $('.group').removeClass('success').addClass('wrong');
      $('label').text('Incorrecto');

      mostrarMensaje(handleClick() + "/3 intentos. La aplicación será bloqueada para este dispositivo luego de 3 intentos incorrectos.");
      document.getElementById("barraCarga").style.display = "none";
      $('input').parent().removeClass('focus');
      $('#dni').val("");
      throw new Error('No se encontró el registro con el DNI proporcionado');
    }
    const data = await response.json();

    $('.group').removeClass('wrong').addClass('success');
    $('label').text('Correcto');
    $('input').parent().removeClass('focus');
    $('#dni').val("");

    console.log('Registro encontrado:', data);

    if (data.identificador === "bloqueado") {
      setLocalStorage("intentos", "6");
      window.location.href = "block.html";

    }

    // Verificar si el identificador es null
    if (data.identificador === "null") {
      setTimeout(() => {
        bienvenida(data.nombre);
      }, 2000);
      let ident = document.getElementById("identificador").innerHTML;
      await actualizarIdentificador(data.id, ident);
    } else {
      if (data.identificador === document.getElementById("identificador").innerHTML) {
        setTimeout(() => {
          bienvenida(data.nombre);
        }, 2000);
      } else {
        setLocalStorage("intentos", "6");
        await actualizarIdentificador(data.id, "bloqueado");
        window.location.href = "block.html";
      }
    }
  } catch (error) {
    $('.group').removeClass('success').addClass('wrong');
    $('label').text('Incorrecto');
    document.getElementById("barraCarga").style.display = "none";
    $('input').parent().removeClass('focus');
    $('#dni').val("");

    document.getElementById("barraCarga").style.display = "none";
  }
}



async function actualizarIdentificador(id, nuevoIdentificador) {


  try {
    const response = await fetch(`https://dni-impact.glitch.me/api/actualizar-identificador/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identificador: nuevoIdentificador })
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el identificador');
      document.getElementById("barraCarga").style.display = "none";
    }
    const data = await response.json();
    console.log('Identificador actualizado:', data);
    document.getElementById("barraCarga").style.display = "none";
  } catch (error) {
    console.error('Error al actualizar el identificador:', error.message);
    document.getElementById("barraCarga").style.display = "none";
  }
}



function bienvenida(nombre) {
  $('#continuar').fadeOut();
  $('.group').fadeOut();
  document.getElementById("titulo").textContent = "BIENVENIDO";
  document.getElementById("name").textContent = nombre;
  document.getElementById("crear").style.display = "none";
  document.getElementById("barraCarga").style.display = "none";

  setTimeout(() => {
    window.location.href = "registrado/config.html";
  }, 3000);

}

function mostrarMensaje(mensaje) {
  var mensajeDiv = document.createElement("div");
  mensajeDiv.id = "MostrarMj";
  mensajeDiv.textContent = mensaje;
  mensajeDiv.style.backgroundColor = "rgb(232, 40, 40)";
  mensajeDiv.style.color = "#fff";
  mensajeDiv.style.padding = "10px 15px";
  mensajeDiv.style.borderRadius = "5px";
  mensajeDiv.style.position = "fixed";
  mensajeDiv.style.right = "2%";
  mensajeDiv.style.top = "30%";
  mensajeDiv.style.zIndex = "9999";
  mensajeDiv.style.width = "95%";
  document.body.appendChild(mensajeDiv);

  setTimeout(function () {
    document.body.removeChild(mensajeDiv);
  }, 7000); // Ocultar el mensaje después de 3 segundos
}


function setLocalStorage(name, value) {
  localStorage.setItem(name, value);
}

function getLocalStorage(name) {
  return localStorage.getItem(name);
}


// Función para obtener el valor de una cookie
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function handleClick() {
  let intentos = parseInt(getLocalStorage("intentos")) || 0;
  intentos++;
  setLocalStorage("intentos", intentos.toString());

  if (intentos >= 3) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById("MostrarMj").style.display = "none";
    window.location.href = "block.html";
    console.log('deshabilitado');
  }
  return intentos;
}


function checkVisit() {
  let intentos = parseInt(getLocalStorage("intentos"));
  if (intentos >= 3) {
    window.location.href = "block.html";
  } else {
    setTimeout(() => {
      document.getElementById("alerta").style.display = "block";
    }, 4000);
  }
}









window.onload = function () {

  Particles.init({
    selector: ".background"
  });
};
const particles = Particles.init({
  selector: ".background",
  color: ["#03dac6", "#ff0266", "#000000"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});

class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function () {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
    let offset =
      $(".nav").offset().top +
      $(".nav").height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").addClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").addClass("nav-container--top-second");
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-second");
      $(".nav-container-container").addClass("nav-container--top-first");
    } else {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").removeClass("nav-container--top-second");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }

}

new NavigationPage();