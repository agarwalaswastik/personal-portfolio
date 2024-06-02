import * as THREE from "three";
import { Font } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

import { letterHeight, nameColor } from "./anim-constants";

const material = new THREE.MeshBasicMaterial({ color: nameColor });

export const models: THREE.Object3D[] = [];
export const modelWidths: number[] = [];
export const modelHeights: number[] = [];

export function initModels(font: Font, name: string) {
  const len = name.length;
  for (let i = 0; i < len; i++) {
    const modelGeom = new TextGeometry(name[i], {
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

    const centerOffsetX = -0.5 * ( modelGeom.boundingBox!.max.x - modelGeom.boundingBox!.min.x );
    const centerOffsetY = -0.5 * ( modelGeom.boundingBox!.max.y - modelGeom.boundingBox!.min.y );
    const centerOffsetZ = -0.5 * ( modelGeom.boundingBox!.max.z - modelGeom.boundingBox!.min.z );
    const modelMesh = new THREE.Mesh(modelGeom, material);
    modelMesh.position.x = centerOffsetX;
    modelMesh.position.y = centerOffsetY;
    modelMesh.position.z = centerOffsetZ;

    const model = new THREE.Object3D();
    model.add(modelMesh);

    models.push(model);
    modelWidths.push(modelGeom.boundingBox!.max.x - modelGeom.boundingBox!.min.x);
    modelHeights.push(modelGeom.boundingBox!.max.y - modelGeom.boundingBox!.min.y);
  }
}
