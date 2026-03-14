// Roadmap — horizontal node timeline
import { roadmap } from '../data/roadmap.js';

export function initRoadmap() {
  const nodesEl = document.getElementById('roadmap-nodes');
  const lineEl = document.getElementById('roadmap-line');

  if (!nodesEl) return;

  roadmap.forEach(node => {
    const el = document.createElement('div');
    el.className = `roadmap-node ${node.status}`;
    el.innerHTML = `
      <p class="roadmap-node-year">${node.year}</p>
      <div class="roadmap-node-dot">${node.icon}</div>
      <p class="roadmap-node-label">${node.tech}</p>
      <span class="roadmap-node-status">${node.status.toUpperCase()}</span>
    `;
    nodesEl.appendChild(el);
  });

  // Animate nodes on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nodes = nodesEl.querySelectorAll('.roadmap-node');
        nodes.forEach((node, i) => {
          setTimeout(() => {
            node.style.opacity = '1';
            node.style.transform = 'translateY(0)';
          }, i * 80);
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Initially hide
  nodesEl.querySelectorAll('.roadmap-node').forEach(node => {
    node.style.opacity = '0';
    node.style.transform = 'translateY(20px)';
    node.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  io.observe(nodesEl);
}
