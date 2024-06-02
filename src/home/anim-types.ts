import * as THREE from "three";

export interface ModelParameters {
  letter: string;
  initPos: [number, number, number];
  xRotations: number;
  yRotations: number;
}

export interface ModelState {
  letterModel: THREE.Object3D;
  finPos: [number, number, number];
  rotY: number;
  finalVelY: number;
  velX: number;
  velZ: number;
  angVelX: number;
  flightAngVelY: number;
  landedAngRetY: number;
  stopTime: number;
}
