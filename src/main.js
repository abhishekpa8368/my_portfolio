// ============================================================
// MAIN.JS — Portfolio App Bootstrap
// Abhishek Pal — DEV OS Portfolio
// ============================================================
import './style.css';

import { runLoader } from './components/Loader.js';
import { initCursor } from './components/Cursor.js';
import { initNavbar } from './components/Navbar.js';
import { initHero } from './components/Hero.js';
import { initSkills } from './components/Skills.js';
import { initProjects } from './components/Projects.js';
import { initExperience } from './components/Experience.js';
import { initOdooHub } from './components/OdooHub.js';
import { initRoadmap } from './components/Roadmap.js';
import { initContact } from './components/Contact.js';
import { initParticles } from './three/ParticleField.js';

// Init cursor immediately (before loader finishes)
initCursor();
initNavbar();

// Init all sections
initSkills();
initProjects();
initExperience();
initOdooHub();
initRoadmap();
initContact();

// Init hero (typewriter without entrance animation yet)
initHero(false);

// After loader: trigger entrance animations
document.addEventListener('loader-complete', () => {
  initHero(true);

  // Start particles after loader
  if (window.innerWidth > 768) {
    initParticles();
  }
});

// Run the terminal loader
runLoader();
