import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

export default function setupHome() {
  const animContainer = document.querySelector(".home__animation-container")! as HTMLElement;
  const fallback = document.querySelector(".home__fallback")! as HTMLElement;

  if (!WebGL.isWebGLAvailable()) {
    fallback.style.display = "flex";
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, animContainer.offsetWidth / animContainer.offsetHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(animContainer.offsetWidth, animContainer.offsetHeight);
  renderer.setAnimationLoop(animate);
  animContainer.appendChild(renderer.domElement);

  window.addEventListener("resize", () => {
    camera.aspect = animContainer.offsetWidth / animContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(animContainer.offsetWidth, animContainer.offsetHeight);
  });

  function animate() {  
    renderer.render(scene, camera);
  }
}
