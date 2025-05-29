  const container = document.getElementById('c19-header');
  const img = document.createElement('img');
  img.src = 'images/C19/header-c19.png';
  img.alt = 'C19 Header';
  img.style.width = '100%';
  img.style.height = 'auto';
  img.style.display = 'block';
  container.appendChild(img);


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
