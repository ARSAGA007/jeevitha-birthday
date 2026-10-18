/* =============================================
   JEEVITHA'S BIRTHDAY WEBSITE — SCRIPT
   ============================================= */

// =============================================
// DATA: PHOTOS & CAPTIONS
// =============================================
const photos = [
  { src: 'public/images/jeevitha-01.jpg', caption: 'Shining bright, as always ✨' },
  { src: 'public/images/jeevitha-02.jpg', caption: 'That beautiful smile 💗' },
  { src: 'public/images/jeevitha-03.jpg', caption: 'Pure happiness looks like this 🌸' },
  { src: 'public/images/jeevitha-04.jpg', caption: 'Absolutely stunning 🌺' },
  { src: 'public/images/jeevitha-05.jpg', caption: 'Glowing like the star she is ⭐' },
  { src: 'public/images/jeevitha-06.jpg', caption: 'Making every moment special 💖' },
  { src: 'public/images/jeevitha-07.jpg', caption: 'Full of grace and joy 🎀' },
  { src: 'public/images/jeevitha-08.jpg', caption: 'Born to shine 🌟' },
  { src: 'public/images/jeevitha-09.jpg', caption: 'Spreading love wherever she goes 💕' },
  { src: 'public/images/jeevitha-10.jpg', caption: 'Happy Birthday, Jeevitha! 🎂🌸' }
];

// =============================================
// DATA: BIRTHDAY WISHES
// =============================================
const wishes = [
  {
    icon: '💗',
    text: 'Happy Birthday, Jeevitha! 💗 May your day be filled with laughter, happiness, beautiful surprises, and everything that makes your heart smile.'
  },
  {
    icon: '🌸',
    text: 'You\'re a wonderful friend, and I hope this new year of your life brings you success, confidence, exciting adventures, and countless beautiful memories. 🌸'
  },
  {
    icon: '✨',
    text: 'May you always have reasons to smile, courage to follow your dreams, and people around you who appreciate the amazing person you are. ✨'
  },
  {
    icon: '🎀',
    text: 'Here\'s to more funny conversations, unforgettable moments, random laughs, and beautiful memories ahead. Happy Birthday, girl! 🎀'
  },
  {
    icon: '🫶',
    text: 'Keep shining, keep growing, and keep being yourself. You deserve so many wonderful things in life. 🫶'
  }
];

// =============================================
// FLOATING BACKGROUND HEARTS & SPARKLES
// =============================================
function createBgFloaters() {
  const container = document.getElementById('bgFloaters');
  const symbols = ['💕', '🌸', '✨', '💗', '🌺', '🎀', '💫', '🌷', '⭐', '🎊', '💖', '🌟', '🎈', '🩷'];
  const count = 45;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'bg-floater';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Spread evenly across full width
    el.style.left = (i / count * 100 + Math.random() * (100 / count)) + 'vw';

    const duration = 18 + Math.random() * 18;   // 18–36 s
    el.style.animationDuration = duration + 's';

    // Negative delay → already mid-animation when page loads (no bare start)
    el.style.animationDelay = -(Math.random() * duration) + 's';

    // Varied sizes: small, medium, large
    const sizes = [0.85, 1.1, 1.4, 1.7, 2.0];
    el.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)] + 'rem';

    container.appendChild(el);
  }
}


function createGiftHearts() {
  const container = document.getElementById('giftHearts');
  const symbols = ['💗', '💕', '💖', '🌸', '✨', '🌷'];
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('span');
    el.className = 'gh';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    el.style.animationDelay = (Math.random() * 6) + 's';
    el.style.fontSize = (0.9 + Math.random() * 1) + 'rem';
    container.appendChild(el);
  }
}

function createGrandFloaters() {
  const container = document.getElementById('grandFloaters');
  const symbols = ['💖', '🎂', '🌸', '✨', '🎀', '💗', '🎊', '🌺', '💕', '⭐'];
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('span');
    el.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${0.8 + Math.random() * 1.5}rem;
      opacity: ${0.1 + Math.random() * 0.3};
      animation: dividerSway ${3 + Math.random() * 4}s ease-in-out infinite alternate;
      pointer-events: none;
    `;
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    container.appendChild(el);
  }
}

// =============================================
// CONFETTI ENGINE
// =============================================
class Confetti {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 150) {
    const colors = ['#ff4d94', '#ff85b3', '#ffd6e7', '#e0006e', '#f7c948', '#c9a0e0', '#ffb3d1', '#ff2e7e'];
    const shapes = ['circle', 'rect', 'heart'];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height * 0.3,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.2,
        gravity: 0.15,
        opacity: 1,
        life: 1
      });
    }
    this.animate();
  }

  animate() {
    if (this.animId) cancelAnimationFrame(this.animId);
    const draw = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = this.particles.filter(p => p.life > 0);
      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.99;
        p.rotation += p.rotV;
        p.life -= 0.008;
        p.opacity = p.life;
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        } else if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          // Simple heart
          this.ctx.beginPath();
          this.ctx.moveTo(0, -p.size / 4);
          this.ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, p.size / 4, 0, p.size / 2);
          this.ctx.bezierCurveTo(-p.size, p.size / 4, -p.size / 2, -p.size / 2, 0, -p.size / 4);
          this.ctx.fill();
        }
        this.ctx.restore();
      }
      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(draw);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };
    this.animId = requestAnimationFrame(draw);
  }

  continuousBurst() {
    const interval = setInterval(() => {
      this.burst(50);
    }, 2000);
    setTimeout(() => clearInterval(interval), 10000);
    this.burst(200);
  }
}

const mainConfetti = new Confetti('confettiCanvas');
let revealConfetti = null;

// =============================================
// BACKGROUND MUSIC — CONTINUOUS BULLETPROOF LOOP
// =============================================
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggleBtn');
const musicIcon = document.getElementById('musicIcon');

let musicStarted = false;
let userPaused = false;   // true only when user explicitly hits the toggle button
let watchdogTimer = null;

// Core settings
bgMusic.volume = 0.30;
bgMusic.loop = true;      // native loop (layer 1)

// Layer 2: ended event — restart if loop somehow missed
bgMusic.addEventListener('ended', () => {
  if (!userPaused) {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});
  }
});

// Layer 3: page visibility — resume when tab comes back into focus
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && musicStarted && !userPaused && bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
});

// Layer 4: watchdog — every 3 s, ensure music is still playing
function startWatchdog() {
  if (watchdogTimer) return;
  watchdogTimer = setInterval(() => {
    if (musicStarted && !userPaused && bgMusic.paused) {
      bgMusic.currentTime = bgMusic.currentTime || 0;
      bgMusic.play().catch(() => {});
    }
  }, 3000);
}

function startBgMusic() {
  if (musicStarted) return;
  musicStarted = true;

  bgMusic.currentTime = 0;
  const playPromise = bgMusic.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        showMusicBtn(true);
        startWatchdog();
      })
      .catch((err) => {
        console.warn('Audio autoplay blocked:', err);
        showMusicBtn(false);   // show muted icon so user can tap to start
        startWatchdog();
      });
  }
}

function showMusicBtn(playing) {
  musicBtn.classList.remove('hidden');
  musicBtn.classList.add('show-btn');
  if (playing) {
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('muted');
    musicIcon.textContent = '🎵';
  } else {
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('muted');
    musicIcon.textContent = '🔇';
  }
}

// User toggle: pause ↔ resume
musicBtn.addEventListener('click', () => {
  if (bgMusic.paused) {
    userPaused = false;
    bgMusic.play()
      .then(() => {
        musicBtn.classList.add('playing');
        musicBtn.classList.remove('muted');
        musicIcon.textContent = '🎵';
      })
      .catch(() => {});
  } else {
    userPaused = true;
    bgMusic.pause();
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('muted');
    musicIcon.textContent = '🔇';
  }
});


// =============================================
// GIFT BOX OPENING
// =============================================
function openGift() {
  const giftScreen = document.getElementById('giftScreen');
  const giftLid = document.getElementById('giftLid');
  const mainSite = document.getElementById('mainSite');

  // Lift lid
  giftLid.classList.add('open');

  // Fire confetti
  mainConfetti.burst(200);

  // Transition to main site
  setTimeout(() => {
    giftScreen.classList.add('fade-out');
  }, 600);

  setTimeout(() => {
    giftScreen.style.display = 'none';
    mainSite.classList.remove('hidden');
    mainSite.classList.add('visible');
    document.body.style.overflow = '';
    initScrollAnimations();
    mainConfetti.burst(100);
    startBgMusic();          // 🎵 start looping music
  }, 1400);
}

// =============================================
// INTERACTIVE SURPRISE CARDS
// =============================================
function revealCard(num) {
  const card = document.getElementById('card' + num);
  if (card) {
    card.classList.toggle('revealed');
  }
}

// =============================================
// BUILD GALLERY
// =============================================
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  photos.forEach((photo, i) => {
    const div = document.createElement('div');
    div.className = 'polaroid fade-in-up';
    div.style.transitionDelay = (i * 0.07) + 's';
    div.innerHTML = `
      <div class="polaroid-ribbon"></div>
      <div class="polaroid-img-wrap" onclick="openLightbox(${i})">
        <img src="${photo.src}" alt="Jeevitha photo ${i + 1}" loading="lazy"
             onerror="this.style.background='linear-gradient(135deg,#ffd6e7,#ff85b3)';this.style.display='flex';this.alt='Photo ${i+1}'" />
      </div>
      <div class="polaroid-caption">${photo.caption}</div>
    `;
    grid.appendChild(div);
  });
}

// =============================================
// BUILD WISHES
// =============================================
function buildWishes(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  wishes.forEach((wish, i) => {
    const div = document.createElement('div');
    div.className = containerId === 'wishesContainer' ? 'wish-card fade-in-up' : 'grand-wish-card';
    div.style.transitionDelay = (i * 0.1) + 's';
    div.innerHTML = `
      <div class="wish-icon">${wish.icon}</div>
      <p>${wish.text}</p>
    `;
    container.appendChild(div);
  });
}

// =============================================
// BUILD GRAND COLLAGE
// =============================================
function buildCollage() {
  const grid = document.getElementById('collageGrid');
  grid.innerHTML = '';
  photos.forEach((photo, i) => {
    const div = document.createElement('div');
    div.className = 'collage-item';
    div.innerHTML = `
      <div class="collage-img-wrap" onclick="openLightbox(${i})">
        <img src="${photo.src}" alt="Jeevitha photo ${i + 1}" loading="lazy"
             onerror="this.style.background='linear-gradient(135deg,#ffd6e7,#ff85b3)'" />
      </div>
      <div class="collage-caption">${photo.caption}</div>
    `;
    grid.appendChild(div);
  });
}

// =============================================
// LIGHTBOX
// =============================================
let currentLightboxIndex = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightbox();
  const lb = document.getElementById('lightbox');
  lb.classList.remove('hidden');
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function updateLightbox() {
  const photo = photos[currentLightboxIndex];
  document.getElementById('lightboxImg').src = photo.src;
  document.getElementById('lightboxCaption').textContent = photo.caption;
  document.getElementById('lightboxCounter').textContent =
    `${currentLightboxIndex + 1} / ${photos.length}`;
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.add('hidden');
  lb.style.display = 'none';
  document.body.style.overflow = '';
}

function lightboxPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + photos.length) % photos.length;
  updateLightbox();
}

function lightboxNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % photos.length;
  updateLightbox();
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (lb && !lb.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'Escape') closeLightbox();
  }
});

// =============================================
// GRAND REVEAL
// =============================================
function showGrandReveal() {
  const grandReveal = document.getElementById('grandReveal');
  grandReveal.classList.remove('hidden');
  grandReveal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  grandReveal.scrollTop = 0;

  // Build content
  buildCollage();
  buildWishes('grandWishesGrid');
  createGrandFloaters();

  // Allow scroll on reveal screen
  setTimeout(() => {
    document.body.style.overflow = '';
    grandReveal.style.overflowY = 'auto';
  }, 100);

  // Confetti!
  if (!revealConfetti) {
    revealConfetti = new Confetti('revealConfetti');
  }
  revealConfetti.continuousBurst();
}

function replaySurprise() {
  // Hide grand reveal
  const grandReveal = document.getElementById('grandReveal');
  grandReveal.classList.add('hidden');
  grandReveal.style.display = 'none';

  // Hide main site
  const mainSite = document.getElementById('mainSite');
  mainSite.classList.add('hidden');
  mainSite.classList.remove('visible');

  // Reset cards
  [1, 2, 3].forEach(n => {
    const card = document.getElementById('card' + n);
    if (card) card.classList.remove('revealed');
  });

  // Show gift screen again
  const giftScreen = document.getElementById('giftScreen');
  giftScreen.style.display = 'flex';
  giftScreen.classList.remove('fade-out');
  const giftLid = document.getElementById('giftLid');
  giftLid.classList.remove('open');

  document.body.style.overflow = '';
  window.scrollTo(0, 0);
}

// =============================================
// SCROLL ANIMATIONS
// =============================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// =============================================
// INITIALIZE ON PAGE LOAD
// =============================================
window.addEventListener('DOMContentLoaded', () => {
  createBgFloaters();
  createGiftHearts();
  buildGallery();
  buildWishes('wishesContainer');
  // Prevent scroll until gift opened
  document.body.style.overflow = 'hidden';
});

// Re-init scroll animations if dynamically added
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) initScrollAnimations();
});

// =============================================
// SCROLL INVITE ARROW — PAUSE ON SCROLL
// =============================================
(function () {
  function pauseScrollArrow() {
    const arrow = document.getElementById('scrollInviteArrow');
    if (arrow) arrow.classList.add('paused');
    window.removeEventListener('scroll', pauseScrollArrow, { passive: true });
  }
  window.addEventListener('scroll', pauseScrollArrow, { passive: true });
})();

