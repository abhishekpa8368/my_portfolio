import * as THREE from 'three';

let scene, camera, renderer, mesh;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const canvas = document.getElementById('hero-canvas');

export function initHeroMesh() {
  if (!canvas) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(400, 400);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // Icosahedron wireframe sphere
  const geometry = new THREE.IcosahedronGeometry(2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00B4FF,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Inner glowing sphere
  const innerGeo = new THREE.IcosahedronGeometry(1.5, 0);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x7B2FFF,
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  });
  scene.add(new THREE.Mesh(innerGeo, innerMat));

  // Mouse parallax
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Auto rotate
  if (mesh) {
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;
  }

  // Mouse parallax with lerp
  targetX += (mouseX - targetX) * 0.05;
  targetY += (mouseY - targetY) * 0.05;

  if (scene) {
    scene.rotation.y = targetX * 0.3;
    scene.rotation.x = -targetY * 0.2;
  }

  renderer.render(scene, camera);
}

export function destroyHeroMesh() {
  if (renderer) renderer.dispose();
}
