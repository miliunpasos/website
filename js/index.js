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







document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video-testimonio');
  const overlay = document.getElementById('overlay-testimonio');

  // Inicializa Plyr
  const player = new Plyr(video, {
    controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
  });

  // Clic en el overlay: reproducir y ocultar el botón
  overlay.addEventListener('click', () => {
    player.play();
    overlay.style.display = 'none';
  });

  // Oculta overlay si el usuario reproduce de otra forma
  player.on('play', () => {
    overlay.style.display = 'none';
  });

  // Muestra el botón de portada otra vez si termina
  player.on('ended', () => {
    overlay.style.display = 'flex';
  });
});
