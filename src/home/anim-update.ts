import { accDueToGrav, landTime } from "./anim-constants";
import { ModelState } from "./anim-types";

export function updateModelState(modelState: ModelState, elapsedTime: number) {
  const model = modelState.letterModel;
  const rt = landTime - elapsedTime;
  const rrt = modelState.stopTime + rt;

  if (rt <= 0) {
    if (rrt > 0) {
      model.rotation.y = modelState.rotY + 0.5 * -modelState.landedAngRetY * rrt * rrt;
    } else {
      model.rotation.y = modelState.rotY;
    }

    model.position.set(...modelState.finPos);
    model.rotation.x = 0;
    model.rotation.z = 0;
    return;
  }

  model.position.x = -modelState.velX * rt + modelState.finPos[0];
  model.position.z = -modelState.velZ * rt + modelState.finPos[2];
  model.position.y = (-modelState.finalVelY + (accDueToGrav / 2) * rt) * rt + modelState.finPos[1];

  model.rotation.x = -modelState.angVelX * rt;
  model.rotation.y = modelState.rotY + modelState.flightAngVelY * (landTime - rt);
}
