// Skills section — cards with liquid bars + IntersectionObserver
import { skills } from '../data/skills.js';
import { initSkillsTorus } from '../three/SkillsTorus.js';

export function initSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  // Render cards
  skills.forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.transitionDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="skill-header">
        <div class="skill-name-row">
          <span class="skill-icon">${skill.icon}</span>
          <span class="skill-name">${skill.name}</span>
        </div>
        <span class="skill-level">${skill.level}</span>
      </div>
      <div class="skill-bar-bg">
        <div class="skill-bar-fill" data-pct="${skill.pct}"></div>
      </div>
      <div class="skill-tags">
        ${skill.tags.map(t => `<span class="skill-tag">${t}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });

  // IntersectionObserver to animate on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        card.classList.add('visible');
        const bar = card.querySelector('.skill-bar-fill');
        if (bar) {
          const pct = bar.dataset.pct;
          setTimeout(() => { bar.style.width = pct + '%'; }, 200);
        }
        io.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  grid.querySelectorAll('.skill-card').forEach(card => io.observe(card));

  // Init 3D torus (desktop only)
  if (window.innerWidth > 1024) {
    initSkillsTorus();
  }
}
