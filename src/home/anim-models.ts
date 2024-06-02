import * as THREE from "three";
import { Font } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

import { letterHeight, nameColor } from "./anim-constants";

export const models: THREE.Object3D[] = [];
export const modelWidths: number[] = [];
export const modelHeights: number[] = [];

export function initModels(font: Font, name: string) {
  const material = new THREE.MeshBasicMaterial({ color: nameColor });
  const len = name.length;
  for (let i = 0; i < len; i++) {
    const [model, modelWidth, modelHeight] = createModel(font, name[i], material);
    models.push(model);
    modelWidths.push(modelWidth);
    modelHeights.push(modelHeight);
  }
}

export function createModel(font: Font, str: string, material: THREE.Material): [THREE.Object3D, number, number] {
  const modelGeom = new TextGeometry(str, {
    font,
    size: letterHeight,
    depth: 0.2,
    bevelThickness: 0.1,
    bevelSize: 0.01,
    bevelEnabled: false,
    bevelOffset: 0,
    bevelSegments: 4,
    curveSegments: 8,
  });
  modelGeom.computeBoundingBox();

  const centerOffsetX = -0.5 * (modelGeom.boundingBox!.max.x - modelGeom.boundingBox!.min.x);
  const centerOffsetY = -0.5 * (modelGeom.boundingBox!.max.y - modelGeom.boundingBox!.min.y);
  const centerOffsetZ = -0.5 * (modelGeom.boundingBox!.max.z - modelGeom.boundingBox!.min.z);
  const modelMesh = new THREE.Mesh(modelGeom, material);
  modelMesh.position.x = centerOffsetX;
  modelMesh.position.y = centerOffsetY;
  modelMesh.position.z = centerOffsetZ;

  if (str === "w") modelMesh.position.x += 0.08;

  const model = new THREE.Object3D();
  model.add(modelMesh);

  return [
    model,
    modelGeom.boundingBox!.max.x - modelGeom.boundingBox!.min.x,
    modelGeom.boundingBox!.max.y - modelGeom.boundingBox!.min.y,
  ];
}
