
  const blocks = document.querySelectorAll('.about-c19-block');

  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    blocks.forEach(block => {
      const top = block.getBoundingClientRect().top;
      if (top < trigger) {
        block.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('load', revealOnScroll);


  






   // Get video and button elements
    const video = document.querySelector('.promo-video');
    const muteToggle = document.querySelector('.mute-toggle');

    // Toggle mute/unmute
    muteToggle.addEventListener('click', () => {
      video.muted = !video.muted;
      muteToggle.textContent = video.muted ? '🔇' : '🔊';
      muteToggle.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
    });

    // Prevent right-click context menu on video
    video.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    // Prevent keyboard controls (spacebar, arrow keys, etc.)
    video.addEventListener('keydown', (e) => {
      e.preventDefault();
    });

    // Ensure video restarts if it ends (redundant with loop, but added for robustness)
    video.addEventListener('ended', () => {
      video.play();
    });








    
let foto_actual_visor = 0;
let autoplay_activo_visor = true;
let intervalo_visor;

const fotos_visor = [
  "images/c19/c19_1.png",
  "images/c19/c19_2.png",
  "images/c19/c19_3.png",
  "images/c19/c19_4.png",
  "images/c19/c19_5.png",
  "images/c19/c19_6.png",
  "images/c19/c19_7.png",
  "images/c19/c19_8.png",
  "images/c19/c19_9.png",
  "images/c19/c19_10.png",
  "images/c19/c19_11.png",
  "images/c19/c19_12.png",
  "images/c19/c19_13.png",
  "images/c19/c19_14.png"
];

function actualizar_foto_visor() {
  const imagen = document.getElementById("imagen_foto_proyecto");
  imagen.style.opacity = 0;
  setTimeout(() => {
    imagen.src = fotos_visor[foto_actual_visor];
    imagen.style.opacity = 1;
  }, 150);
}

function foto_anterior_visor() {
  foto_actual_visor = (foto_actual_visor - 1 + fotos_visor.length) % fotos_visor.length;
  actualizar_foto_visor();
}

function foto_siguiente_visor() {
  foto_actual_visor = (foto_actual_visor + 1) % fotos_visor.length;
  actualizar_foto_visor();
}

function alternar_autoplay_visor() {
  autoplay_activo_visor = !autoplay_activo_visor;
  const boton = document.getElementById("boton_autoplay_visor");
  boton.textContent = autoplay_activo_visor ? "⏸ Pausar" : "▶ Reanudar";
}

function iniciar_autoplay_visor() {
  intervalo_visor = setInterval(() => {
    if (autoplay_activo_visor) {
      foto_siguiente_visor();
    }
  }, 4000);
}

// Swipe móvil
const visor = document.getElementById("contenedor_visor_fotos");
let inicio_x_visor = 0;
let fin_x_visor = 0;

// Agregar listener con { passive: true }
visor.addEventListener("touchstart", e => {
  inicio_x_visor = e.changedTouches[0].screenX;
}, { passive: true });

visor.addEventListener("touchend", e => {
  fin_x_visor = e.changedTouches[0].screenX;
  interpretar_swipe_visor();
});

function interpretar_swipe_visor() {
  const diferencia = inicio_x_visor - fin_x_visor;
  if (diferencia > 50) foto_siguiente_visor();
  else if (diferencia < -50) foto_anterior_visor();
}

// 🚀 Iniciar todo
actualizar_foto_visor();
iniciar_autoplay_visor();
