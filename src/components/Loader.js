// Terminal boot loader animation

const CHECKS = [
  '✓ PYTHON RUNTIME LOADED',
  '✓ ODOO ENGINE READY',
  '✓ FULL STACK MODULES ACTIVE',
];

function typeText(el, text, speed = 40) {
  return new Promise((resolve) => {
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export async function runLoader() {
  const loader = document.getElementById('loader');
  const text1 = document.getElementById('loader-text-1');
  const text2 = document.getElementById('loader-text-2');
  const bar = document.getElementById('loader-bar');
  const checksEl = document.getElementById('loader-checks');
  const readyEl = document.getElementById('loader-ready');

  if (!loader) return;

  await sleep(200);
  await typeText(text1, 'INITIALIZING DEV OS...', 35);
  await sleep(200);
  await typeText(text2, 'LOADING MODULES...', 35);
  await sleep(300);

  // Progress bar
  bar.style.width = '70%';
  await sleep(600);
  bar.style.width = '100%';
  await sleep(400);

  // Check marks 
  for (const check of CHECKS) {
    const el = document.createElement('p');
    el.className = 'loader-check';
    el.textContent = check;
    checksEl.appendChild(el);
    await sleep(100);
    el.classList.add('visible');
    await sleep(200);
  }

  await sleep(300);
  readyEl.textContent = 'SYSTEM READY. WELCOME, VISITOR_ ';
  await sleep(600);

  // Fade out loader
  loader.style.transition = 'opacity 0.5s ease';
  loader.style.opacity = '0';
  await sleep(500);
  loader.style.display = 'none';

  // Trigger hero entrance
  document.dispatchEvent(new CustomEvent('loader-complete'));
}
