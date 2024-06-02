import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

import { Font, FontLoader } from "three/addons/loaders/FontLoader.js";

import { fontPath, cameraPosZ } from "./anim-constants";
import { initModels, models } from "./anim-models";

export default function setupHome() {
  const fallback = document.querySelector(".home__fallback")! as HTMLElement;

  if (!WebGL.isWebGLAvailable()) {
    fallback.style.display = "flex";
    return;
  }

  const loader = new FontLoader();
  loader.load(fontPath, setupScene);
}

function setupScene(font: Font) {
  const animContainer = document.querySelector(".home__animation-container")! as HTMLElement;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, animContainer.offsetWidth / animContainer.offsetHeight, 0.1, 1000);
  camera.position.z = cameraPosZ;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(animContainer.offsetWidth, animContainer.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setAnimationLoop(animate);
  animContainer.appendChild(renderer.domElement);

  window.addEventListener("resize", function () {
    camera.aspect = animContainer.offsetWidth / animContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(animContainer.offsetWidth, animContainer.offsetHeight);
  });

  initModels(font);

  const gridHelper = new THREE.GridHelper();
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  function animate() {
    renderer.render(scene, camera);
  }
}
