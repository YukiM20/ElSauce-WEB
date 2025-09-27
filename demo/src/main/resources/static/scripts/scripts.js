// Botón scroll-up
document.addEventListener('DOMContentLoaded', function() {
    const scrollUp = document.querySelector(".scroll-up");

    function alternarBotonScrollUp(pixeles) {
        let ticking = false;
        
        function updateScrollUp() {
            const scroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scroll > pixeles) {
                scrollUp.classList.add("visible");
            } else {
                scrollUp.classList.remove("visible");
            }
            
            ticking = false;
        }

        window.addEventListener("scroll", () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollUp);
                ticking = true;
            }
        });
    }

    // Función para hacer scroll hacia arriba
    scrollUp.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Inicializar con 350px de scroll
    alternarBotonScrollUp(350);





});
// === REGISTRO ===

// Abrir modal de registro
document.getElementById("openReserva").onclick = function () {
  document.getElementById("modalLogin").style.display = "none";
  document.getElementById("modalReserva").style.display = "block";
};

// Cerrar modal de registro (botón X)
document.querySelector("#modalReserva .close").onclick = function () {
  document.getElementById("modalReserva").style.display = "none";
};

// Cerrar modal de registro si clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modalReserva")) {
    document.getElementById("modalReserva").style.display = "none";
  }
});

// Enviar formulario de registro (usa validación HTML5)
document.getElementById("formReserva").addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    // Si hay campos vacíos, dejamos que el navegador muestre el tooltip
    return;
  }

  e.preventDefault(); // Si es válido, detenemos el envío normal
  let nombre = document.getElementById("nombre").value;
  alert("✅ Te has registrado con éxito. ¡Gracias " + nombre + "!");
  document.getElementById("modalReserva").style.display = "none";
  this.reset();
});

// === LOGIN ===

// Abrir modal de login
document.getElementById("openLogin").onclick = function () {
  document.getElementById("modalLogin").style.display = "block";
  document.getElementById("modalReserva").style.display = "none";
};

// Cerrar modal de login (botón X)
document.querySelector("#modalLogin .close").onclick = function () {
  document.getElementById("modalLogin").style.display = "none";
};

// Cerrar modal de login si clic fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modalLogin")) {
    document.getElementById("modalLogin").style.display = "none";
  }
});

//Enviar formulario de login
document.getElementById("formLogin").addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    // Si falta algo, deja que el navegador muestre la nube de error
    return;
  }

  e.preventDefault(); 
  alert("👋 Bienvenido");
  document.getElementById("modalLogin").style.display = "none";
  this.reset();
});

// Abrir registro desde el login
document.getElementById("openRegistro").onclick = function () {
  document.getElementById("modalLogin").style.display = "none";
  document.getElementById("modalReserva").style.display = "block";
};


// =========================
// MENÚ HAMBURGUESA MÓVIL
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const btnHambur = document.querySelector('.menu-hambur');
    const menu = document.querySelector('.menu');
    const overlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu ul li a');
    const iconHambur = btnHambur.querySelector('i');

    function abrirMenu() {
        menu.classList.add('menu-activo');
        overlay.classList.add('activo');
        document.body.style.overflow = 'hidden';
        if(iconHambur) {
            iconHambur.classList.remove('fa-bars');
            iconHambur.classList.add('fa-times');
        }
    }
    function cerrarMenu() {
        menu.classList.remove('menu-activo');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
        if(iconHambur) {
            iconHambur.classList.remove('fa-times');
            iconHambur.classList.add('fa-bars');
        }
    }

    btnHambur.addEventListener('click', function(e) {
        e.stopPropagation();
        if (menu.classList.contains('menu-activo')) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });

    overlay.addEventListener('click', cerrarMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', cerrarMenu);
    });

    // Cerrar menú si se redimensiona a escritorio
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            cerrarMenu();
        }
    });
});
