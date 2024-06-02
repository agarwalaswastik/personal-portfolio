import { ModelParameters, ModelState } from "./anim-types";

import {
  minNameInitPosY,
  maxNameInitPosY,
  minXRotations,
  minYRotations,
  maxXRotations,
  maxYRotations,
  letterSpacing,
  cameraPosZ,
  nameFinPosY,
  landTime,
  accDueToGrav,
  maxFlightAngVelY,
} from "./anim-constants";

import { randomInitPos, randomIntFromInterval } from "./anim-utils";
import { modelHeights, models, modelWidths } from "./anim-models";

export function createParameters(name: string) {
  let result: ModelParameters[] = [];

  const len = name.length;
  let usedPairs: Array<[number, number]> = [];
  for (let i = 0; i < len; i++) {
    usedPairs.push(randomInitPos());
  }

  usedPairs.sort((a, b) => {
    if (a[0] == b[0]) return a[1] - b[1];
    return a[0] - b[0];
  });

  for (let i = 0; i < len; i++) {
    result.push({
      letter: name[i],
      initPos: [usedPairs[i][0], randomIntFromInterval(minNameInitPosY, maxNameInitPosY), usedPairs[i][1]],
      xRotations: randomIntFromInterval(minXRotations, maxXRotations),
      yRotations: randomIntFromInterval(minYRotations, maxYRotations),
    });
  }

  return result;
}

export function initStates(modelsParams: ModelParameters[]) {
  let result: ModelState[] = [];

  const modelNum = modelsParams.length;
  let wordWidth: number = 0;
  for (let i = 0; i < modelNum; i++) wordWidth += modelWidths[i];
  wordWidth += letterSpacing * (modelNum - 1);

  let widthCovered: number = 0;
  for (let i = 0; i < modelNum; i++) {
    widthCovered += modelWidths[i] / 2;

    const delta = (wordWidth / 2 - widthCovered) / cameraPosZ;
    const ip = modelsParams[i].initPos;
    const fp: [number, number, number] = [
      -Math.sin(delta) * cameraPosZ,
      nameFinPosY + modelHeights[i] / 2,
      cameraPosZ - Math.cos(delta) * cameraPosZ,
    ];
    const t = landTime;

    const initVelY = (fp[1] - ip[1] - (accDueToGrav / 2) * t * t) / t;
    const finalVelY = initVelY + accDueToGrav * t;

    let flightAngVelY: number, landedAngRetY: number, stopTime: number;

    if (Math.abs(modelsParams[i].yRotations * 2 * Math.PI) > maxFlightAngVelY * t + Math.PI) {
      flightAngVelY = modelsParams[i].yRotations > 0 ? maxFlightAngVelY : -maxFlightAngVelY;

      const remDisp = modelsParams[i].yRotations * 2 * Math.PI - flightAngVelY * t;
      landedAngRetY = -(flightAngVelY * flightAngVelY) / (2 * remDisp);
      stopTime = -flightAngVelY / landedAngRetY;
    } else {
      flightAngVelY = (modelsParams[i].yRotations * 2 * Math.PI) / t;
      landedAngRetY = 0;
      stopTime = 0;
    }

    models[i].position.set(...ip);
    models[i].rotation.y = delta;

    result.push({
      letterModel: models[i],
      finPos: fp,
      rotY: delta,
      finalVelY,
      velX: (fp[0] - ip[0]) / t,
      velZ: (fp[2] - ip[2]) / t,
      angVelX: (modelsParams[i].xRotations * 2 * Math.PI) / t,
      flightAngVelY,
      landedAngRetY,
      stopTime,
    });

    widthCovered += modelWidths[i] / 2 + letterSpacing;
  }

  return result;
}
