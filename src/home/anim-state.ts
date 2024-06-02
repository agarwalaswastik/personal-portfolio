import { ModelParameters } from "./anim-types";

import {
  name,
  minNameInitPosY,
  maxNameInitPosY,
  minXRotations,
  minYRotations,
  maxXRotations,
  maxYRotations,
} from "./anim-constants";

import { randomInitPos, randomIntFromInterval } from "./anim-utils";

export function createParameters() {
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

export function initStates() {
  
}