import { GameManager } from "../../Manager/GameManager";
import { PlayerActionStep, PlayerActionStepDataResolver } from "./PlayerActionStep";
import DefaultStepsCreator from "./DefaultStepsCreator";
import { PlayerActionStepName } from "./type";

export abstract class PlayerActionStepManager {
  static steps: { [index: number | string]: PlayerActionStep } = {};
  private static gui: GameManager;

  static init(gui: GameManager) {
    this.gui = gui;
  }

  static dispose() {
    this.gui = null;
  }

  static getStep(stepName: PlayerActionStepName, resolver?: PlayerActionStepDataResolver) {
    return new PlayerActionStep({
      name: stepName,
      handler: DefaultStepsCreator[stepName](this.gui),
      resolver: resolver,
    });
  }
}
