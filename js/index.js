  const video = document.getElementById('videoAd');
  const muteToggle = document.querySelector('.mute-toggle');

  const sources = [
    'images/c19/ad_video1.mp4',
    'images/c19/ad_video2.mp4'
  ];
  let currentVideo = 0;

  // Cambiar video al terminar el anterior
  video.addEventListener('ended', () => {
    currentVideo = (currentVideo + 1) % sources.length;
    video.src = sources[currentVideo];
    video.load();  // Cargar nuevo video
    video.play();  // Reproducir nuevo video
  });

  // Mute toggle
  muteToggle.addEventListener('click', () => {
    video.muted = !video.muted;
    muteToggle.textContent = video.muted ? '🔇' : '🔊';
    muteToggle.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  });

  // Prevención de controles nativos
  video.addEventListener('contextmenu', e => e.preventDefault());
  video.addEventListener('keydown', e => e.preventDefault());


let foto_actual_visor = 0;
let autoplay_activo_visor = true;
let intervalo_visor;

const fotos_visor = [
  "images/projects-photos/01.png",
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

visor.addEventListener("touchstart", e => {
  inicio_x_visor = e.changedTouches[0].screenX;
});

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
