var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: -32, // DISTANCIA ENTRE DIAPOSITIVAS
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // Permite hacer clic en los puntos para cambiar de diapositiva
  },
  on: {
    slideChange: function () {
      // Restablece el color de todos los puntos a gris
      var bullets = document.querySelectorAll('.swiper-pagination-bullet');
      bullets.forEach(function (bullet) {
        bullet.style.backgroundColor = 'gray';
      });

      // Obtiene el índice de la diapositiva activa y actualiza el color del punto correspondiente
      var activeIndex = swiper.activeIndex;
      bullets[activeIndex].style.backgroundColor = '#428bca';
    },
  },
});



 
 
 

  
  document.getElementById("escapar").addEventListener("click", function() {
    // Redirigir al usuario a la URL deseada en la misma ventana
    window.location.href = "https://configuracion.vercel.app/linkmp.html";
  });
 





