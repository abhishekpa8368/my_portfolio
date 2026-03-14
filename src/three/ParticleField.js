// Particle network canvas background
const canvas = document.getElementById('particle-canvas');

let particles = [];
let animFrame;
let ctx, W, H;

const PARTICLE_COUNT = 80;
const MAX_DISTANCE = 150;
const PARTICLE_COLOR = 'rgba(0, 180, 255,';
const LINE_COLOR = 'rgba(0, 180, 255,';

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = PARTICLE_COLOR + this.opacity + ')';
    ctx.fill();
  }
}

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  // Re-create particles in bounds
  particles.forEach(p => p.reset());
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DISTANCE) {
        const alpha = (1 - dist / MAX_DISTANCE) * 0.2;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = LINE_COLOR + alpha + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  animFrame = requestAnimationFrame(loop);
}

export function initParticles() {
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;

  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

  window.addEventListener('resize', resize);
  loop();
}

export function destroyParticles() {
  cancelAnimationFrame(animFrame);
  window.removeEventListener('resize', resize);
}
