// Custom neon cursor: dot + lagging ring

export function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // Check if touch device
  if (window.matchMedia('(hover: none)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot follows instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Ring lerps
  function lerpRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(lerpRing);
  }
  lerpRing();

  // Hover states
  function addHover(el) {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  }

  document.querySelectorAll('a, button, .sidebar-item, .project-card, .contact-card, .skill-card').forEach(addHover);

  // Re-apply for dynamically added elements
  document.addEventListener('cursor-refresh', () => {
    document.querySelectorAll('a, button, .sidebar-item, .project-card, .contact-card, .skill-card').forEach(addHover);
  });
}
