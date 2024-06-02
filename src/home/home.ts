import * as THREE from "three";
import WebGL from "three/addons/capabilities/WebGL.js";

import { Font, FontLoader } from "three/addons/loaders/FontLoader.js";

import { fontPath, cameraPosZ, helloColor, letterHeight, iAmColor } from "./anim-constants";
import { createModel, initModels } from "./anim-models";
import { createParameters, initStates } from "./anim-state";
import { updateModelState } from "./anim-update";

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

  let elapsedTime: number = 0;
  const clock = new THREE.Clock();
  const name = "Swastik";

  initModels(font, name);
  const modelsParams = createParameters(name);
  const modelsStates = initStates(modelsParams);

  modelsStates.forEach(modelState => scene.add(modelState.letterModel));

  const hello = createModel(font, "Hello,", new THREE.MeshBasicMaterial({ color: helloColor }));
  const helloModel = hello[0];
  helloModel.position.set(-hello[1] / 2 - 0.25, letterHeight * 2, 0);
  scene.add(helloModel);

  const iAm = createModel(font, "I am", new THREE.MeshBasicMaterial({ color: iAmColor }));
  const iAmModel = iAm[0];
  iAmModel.position.set(iAm[1] / 2 + 0.25, letterHeight * 2, 0);
  scene.add(iAmModel);

  function animate() {
    const delta = clock.getDelta();
    elapsedTime += delta;
    modelsStates.forEach(modelState => updateModelState(modelState, elapsedTime));

    renderer.render(scene, camera);
  }
}
