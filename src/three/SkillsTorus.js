import * as THREE from 'three';

let scene, camera, renderer, torus;
const canvas = document.getElementById('torus-canvas');

export function initSkillsTorus() {
  if (!canvas) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
  camera.position.z = 8;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(300, 300);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Main torus
  const geometry = new THREE.TorusGeometry(2.5, 0.6, 16, 80);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00B4FF,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });
  torus = new THREE.Mesh(geometry, material);
  scene.add(torus);

  // Inner torus ring
  const innerGeo = new THREE.TorusGeometry(1.5, 0.3, 8, 60);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x7B2FFF,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const innerTorus = new THREE.Mesh(innerGeo, innerMat);
  innerTorus.rotation.x = Math.PI / 2;
  scene.add(innerTorus);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (torus) {
    torus.rotation.x += 0.008;
    torus.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}

export function destroySkillsTorus() {
  if (renderer) renderer.dispose();
}
