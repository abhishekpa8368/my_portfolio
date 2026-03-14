// Hero Section — typewriter, counter animations
import gsap from 'gsap';
import { initHeroMesh } from '../three/HeroMesh.js';

const TYPEWRITER_TEXTS = [
  'Odoo ERP Developer',
  'Full Stack Engineer',
  'Python Developer',
  'Django Developer',
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimer = null;

function typeLoop(el) {
  const text = TYPEWRITER_TEXTS[typeIndex];
  let displayText = text.substring(0, charIndex);

  el.innerHTML = displayText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < text.length) {
    charIndex++;
    typeTimer = setTimeout(() => typeLoop(el), 80);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    typeTimer = setTimeout(() => typeLoop(el), 40);
  } else if (!isDeleting && charIndex === text.length) {
    isDeleting = true;
    typeTimer = setTimeout(() => typeLoop(el), 1800);
  } else {
    isDeleting = false;
    typeIndex = (typeIndex + 1) % TYPEWRITER_TEXTS.length;
    typeTimer = setTimeout(() => typeLoop(el), 300);
  }
}

function animateCounters() {
  document.querySelectorAll('.count').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

export function initHero(afterLoader = false) {
  const subtitle = document.getElementById('typewriter');
  const heroLeft = document.querySelector('.hero-left');

  if (afterLoader) {
    // Animate hero in after loader
    gsap.fromTo('.hero-left', 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    );
    gsap.fromTo('.terminal-card',
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.available-badge',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'back.out', delay: 0.4 }
    );
    gsap.fromTo('.hero-name .line-1, .hero-name .line-2',
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out', delay: 0.6 }
    );
    gsap.fromTo('.hero-stats',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.9,
        onComplete: animateCounters }
    );
    gsap.fromTo('.hero-ctas',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.1 }
    );
    gsap.fromTo('.scroll-indicator',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, delay: 1.5 }
    );
  }

  if (subtitle) typeLoop(subtitle);

  // Init 3D sphere (desktop only)
  if (window.innerWidth > 768) {
    initHeroMesh();
  }
}
