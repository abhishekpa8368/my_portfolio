// Projects section — horizontal scroll + 3D tilt hover
import { projects } from '../data/projects.js';

export function initProjects() {
  const track = document.getElementById('project-track');
  const container = document.getElementById('projects-container');
  const progressBar = document.getElementById('projects-progress-bar');

  if (!track) return;

  projects.forEach((project, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.borderColor = project.color + '33';
    card.innerHTML = `
      <span class="project-number">${String(i + 1).padStart(2, '0')}</span>
      <span class="project-type-badge" style="color:${project.color}; background:${project.color}22; border: 1px solid ${project.color}44;">
        ${project.type}
      </span>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.desc}</p>
      <div class="project-stack">
        ${project.stack.map(t => `<span class="stack-tag" style="border-color:${project.color}33">${t}</span>`).join('')}
      </div>
      <a href="${project.github}" class="project-link" target="_blank" rel="noopener">
        <span>VIEW ON GITHUB</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 17L17 7M17 7H7M17 7v10"/>
        </svg>
      </a>
    `;

    // 3D tilt on hover
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        perspective(1000px)
        rotateY(${x * 12}deg)
        rotateX(${-y * 12}deg)
        translateZ(10px)
      `;
      card.style.boxShadow = `0 20px 60px ${project.color}22`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      card.style.boxShadow = '';
    });

    track.appendChild(card);
  });

  // Progress bar on scroll
  if (container && progressBar) {
    container.addEventListener('scroll', () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const pct = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      progressBar.style.width = pct + '%';
    }, { passive: true });
  }
}
