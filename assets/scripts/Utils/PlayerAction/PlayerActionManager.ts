import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStep } from "./PlayerActionStep";
import DefaultStepsCreator from "./DefaultStepsCreator";
import DefaultActionsCraetor from "./DefaultActionsCreator";
import { PlayerAction } from "./PlayerAction";

export abstract class PlayerActionStepManager {
  static steps: { [index: number | string]: PlayerActionStep } = {};

  static init(gui: GameManager) {
    for (let name in DefaultStepsCreator) {
      this.addStep(
        new PlayerActionStep({
          name,
          handler: DefaultStepsCreator[name](gui),
        })
      );
    }
  }

  static dispose() {
    this.steps = {};
  }

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

export abstract class PlayerActionManager {
  static actions: { [index: number | string]: PlayerAction } = {};

  static init(gui: GameManager) {
    for (let name in DefaultActionsCraetor) {
      this.addAction(
        new PlayerAction({
          name,
          stepRoute: DefaultActionsCraetor[name](gui),
        })
      );
    }
  }

  static dispose() {
    this.actions = {};
  }

  static getAction(index: string | number) {
    return this.actions[index];
  }

  static addAction(action: PlayerAction) {
    if (this.getAction(action.id) || this.getAction(action.name)) this.removeAction(action);
    this.actions[action.id] = action;
    if (action.name) this.actions[action.name] = action;
  }

  static removeAction(action: PlayerAction);
  static removeAction(actionName: string);
  static removeAction(actionId: number);
  static removeAction(value: PlayerAction | string | number) {
    let action: PlayerAction;
    if (value instanceof PlayerAction) {
      action = value;
    } else {
      action = this.actions[value];
      if (!action) return;
    }

    delete this.actions[action.id];
    if (action.name) delete this.actions[action.name];
  }
}
