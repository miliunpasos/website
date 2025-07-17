// Configuración y constantes globales
const CONFIG = {
  paths: {
    logo: 'images/logo.png',
    animatedLogo: 'images/animated-logo.mp4',
    brandVideos: ['images/c19/brand_video1.mp4', 'images/c19/brand_video2.mp4']
  },
  plyrControls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
};


class BrandVideoPlayer {
  constructor(videoElement, muteToggleElement) {
    this.video = videoElement;
    this.muteToggle = muteToggleElement;
    this.currentVideoIndex = 0;
    this.sources = CONFIG.paths.brandVideos;
    this.initializeEvents();
  }

  initializeEvents() {
    this.video.addEventListener('ended', () => this.playNextVideo());
    this.muteToggle.addEventListener('click', () => this.toggleMute());
    this.preventDefaultControls();
  }

  playNextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.sources.length;
    this.video.src = this.sources[this.currentVideoIndex];
    this.video.load();
    this.video.play();
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.muteToggle.textContent = this.video.muted ? '🔇' : '🔊';
    this.muteToggle.setAttribute('aria-label', 
      this.video.muted ? 'Unmute video' : 'Mute video');
  }

  preventDefaultControls() {
    this.video.addEventListener('contextmenu', e => e.preventDefault());
    this.video.addEventListener('keydown', e => e.preventDefault());
  }
}

// Clase para manejar el video testimonial
class TestimonialPlayer {
  constructor(videoElement, overlayElement) {
    this.video = videoElement;
    this.overlay = overlayElement;
    this.player = this.initializePlyr();
    this.initializeEvents();
  }

  initializePlyr() {
    return new Plyr(this.video, {
      controls: CONFIG.plyrControls
    });
  }

  initializeEvents() {
    this.overlay.addEventListener('click', () => this.handleOverlayClick());
    this.player.on('play', () => this.hideOverlay());
    this.player.on('ended', () => this.showOverlay());
  }

  handleOverlayClick() {
    this.player.play();
    this.hideOverlay();
  }

  hideOverlay() {
    this.overlay.style.display = 'none';
  }

  showOverlay() {
    this.overlay.style.display = 'flex';
  }
}

// Clase para manejar los logos animados
class AnimatedLogo {
  constructor(container, isHeader = false) {
    this.container = container;
    this.isHeader = isHeader;
    this.isVideo = true;
    this.initializeVideo();
    this.initializeEvents();
  }

  initializeVideo() {
    const dimensions = this.isHeader ? this.getCurrentDimensions() : {};
    this.container.innerHTML = this.createVideoHTML(dimensions);
  }

  getCurrentDimensions() {
    const element = this.container.querySelector('video, img');
    return {
      height: element.offsetHeight,
      width: element.offsetWidth
    };
  }

  createVideoHTML(dimensions = {}) {
    const style = dimensions.height ? 
      `style="height: ${dimensions.height}px; width: ${dimensions.width}px;"` : '';
    return `
      <video autoplay loop muted playsinline ${style}>
        <source src="${CONFIG.paths.animatedLogo}" type="video/mp4">
      </video>
    `;
  }

  createImageHTML(dimensions = {}) {
    const style = dimensions.height ? 
      `style="height: ${dimensions.height}px; width: ${dimensions.width}px;"` : '';
    return `
      <img src="${CONFIG.paths.logo}" alt="Logo" ${style}>
    `;
  }

  toggleMedia() {
    const dimensions = this.isHeader ? this.getCurrentDimensions() : {};
    this.container.innerHTML = this.isVideo ? 
      this.createImageHTML(dimensions) : 
      this.createVideoHTML(dimensions);
    this.isVideo = !this.isVideo;
  }

  initializeEvents() {
    this.container.addEventListener('click', () => this.toggleMedia());
  }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar video publicitario
  const adPlayer = new BrandVideoPlayer(
    document.getElementById('videoBrand'),
    document.querySelector('.mute-toggle')
  );

  // Inicializar video testimonial
  const testimonialPlayer = new TestimonialPlayer(
    document.getElementById('video-testimonio'),
    document.getElementById('overlay-testimonio')
  );

  // Inicializar logos animados
  const avatarLogo = new AnimatedLogo(
    document.getElementById('avatarContainer')
  );
  
  const headerLogo = new AnimatedLogo(
    document.getElementById('logoCabeceraContainer'),
    true
  );
});