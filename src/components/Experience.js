// Experience Timeline — animated cards, SVG line draw
import { experience } from '../data/experience.js';

export function initExperience() {
  const cards = document.getElementById('timeline-cards');
  if (!cards) return;

  experience.forEach((exp, i) => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.style.transitionDelay = `${i * 0.1}s`;
    item.style.borderLeft = `3px solid ${exp.color}`;
    item.innerHTML = `
      <p class="timeline-period">${exp.period}</p>
      <div style="display:flex; align-items:center; flex-wrap:wrap; gap:8px;">
        <h3 class="timeline-company">${exp.company}</h3>
        ${exp.current ? `<span class="current-badge"><span class="dot-pulse green"></span>CURRENT</span>` : ''}
      </div>
      <p class="timeline-role" style="color:${exp.color}">${exp.role}</p>
      <p class="timeline-type">${exp.type}</p>
      <div class="timeline-highlights">
        ${exp.highlights.map(h => `<p class="timeline-highlight">${h}</p>`).join('')}
      </div>
    `;
    cards.appendChild(item);
  });

  // Animate on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.querySelectorAll('.timeline-item').forEach(item => io.observe(item));

  // Simple SVG line draw on section scroll
  const svg = document.getElementById('timeline-svg');
  const progress = document.getElementById('timeline-progress');
  if (!svg || !progress) return;

  const section = document.getElementById('experience');
  const trackLine = svg.querySelector('.timeline-track');

  function updateLine() {
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;
    const progress_pct = Math.max(0, Math.min(1, (viewH - rect.top) / (rect.height + viewH)));
    if (progress) {
      progress.setAttribute('y2', String(Math.round(progress_pct * 400)));
    }
  }

  window.addEventListener('scroll', updateLine, { passive: true });
}
