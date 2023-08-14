import { PlayerActionStep } from "./PlayerActionStep";

export abstract class PlayerActionStepManager {
  static steps: { [index: number | string]: PlayerActionStep };

  static getStep(stepName: string);
  static getStep(stepId: number);
  static getStep(index: string | number) {
    return this.steps[index];
  }

  static addStep(step: PlayerActionStep) {
    if (this.getStep(step.id) || this.getStep(step.name)) this.removeStep(step);
    this.steps[step.id] = step;
    if (step.name) this.steps[step.name] = step;
  }

  static removeStep(step: PlayerActionStep);
  static removeStep(stepName: string);
  static removeStep(stepId: number);
  static removeStep(value: PlayerActionStep | string | number) {
    let step: PlayerActionStep;
    if (value instanceof PlayerActionStep) {
      step = value;
    } else {
      step = this.steps[value];
      if (!step) return;
    }

    delete this.steps[step.id];
    if (step.name) delete this.steps[step.name];
  }
}
