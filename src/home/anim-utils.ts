import { maxX, maxZ, minX, minZ } from "./anim-constants";

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffleArrayOfPairs(array: Array<[number, number]>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const possibleInitPos: Array<[number, number]> = [];
for (let i = minX; i <= maxX; i++) {
  for (let j = minZ; j <= maxZ; j++) {
    possibleInitPos.push([i, j]);
  }
}
let idx: number = possibleInitPos.length;

export function randomInitPos() {
  if (idx === possibleInitPos.length) {
    idx = 0;
    shuffleArrayOfPairs(possibleInitPos);
  }

  const res = possibleInitPos[idx];
  idx++;
  return res;
}
