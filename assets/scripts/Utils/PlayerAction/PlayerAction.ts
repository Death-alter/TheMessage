import { PlayerActionStepManager } from "./PlayerActionManager";
import { PlayerActionStep, PlayerActionStepData } from "./PlayerActionStep";

export abstract class PlayerAction {
  private static index: number = -1;
  private static stepList: PlayerActionStep[] = [];
  private static defaultData: { [index: string]: any }[] = [];
  private static stepStack: PlayerActionStep[] = [];
  private static dataStack: PlayerActionStepData[] = [];

  private static complete: (data?: PlayerActionStepData[]) => void;
  private static cancel: (data?: PlayerActionStepData[]) => void;
  private static stepChange: (data?: PlayerActionStepData[]) => void;

  private static get currentStep() {
    if (this.stepStack.length > 0) {
      return this.stepStack[this.stepStack.length - 1];
    } else {
      return null;
    }
  }

  private static get currentData() {
    if (this.dataStack.length > 0) {
      return this.dataStack[this.dataStack.length - 1];
    } else {
      return null;
    }
  }

  static start(data?: PlayerActionStepData) {
    let nextStep;
    if (data.stepName) {
      nextStep = PlayerActionStepManager.getStep(data.stepName);
    } else if (data.step) {
      nextStep = data.step;
    } else {
      this.index = 0;
      nextStep = this.stepList[this.index];
    }

    if (!nextStep) {
      return;
    }

    this.stepStack.push(this.stepList[this.index]);
    this.dataStack.push({ params: data });
    this.handleStep();

    return this;
  }

  static next(data?: PlayerActionStepData) {
    let nextStep;
    if (data.stepName) {
      nextStep = PlayerActionStepManager.getStep(data.stepName);
    } else if (data.step) {
      nextStep = data.step;
    } else {
      ++this.index;
      nextStep = this.stepList[this.index];
      if (!data.params) data.params = this.defaultData[this.index];
    }

    this.dataStack.push(data);
    this.stepChange?.();

    if (!nextStep) {
      this.complete?.(this.dataStack);
    } else {
      this.stepStack.push(nextStep);
      this.handleStep();
    }

    return this;
  }

  static prev() {
    this.stepChange?.();
    if (this.currentStep) {
      this.dataStack.pop();
      const step = this.stepStack.pop();
      if (step === this.stepList[this.index]) {
        --this.index;
      }
      this.handleStep();
    } else {
      this.cancel?.(this.dataStack);
    }

    return this;
  }

  private static handleStep() {
    this.currentStep.handler(this.currentData, {
      next: this.next.bind(this),
      prev: this.prev.bind(this),
    });
  }

  static addStep(step: string | PlayerActionStep, data?: PlayerActionStepData) {
    if (step instanceof PlayerActionStep) {
      this.stepList.push(step);
    } else {
      const s = PlayerActionStepManager.getStep(step);
      if (step) {
        this.stepList.push(s);
      } else {
        throw new Error("未找到Step：" + step);
      }
    }
    this.defaultData.push(data);

    return this;
  }

  static clear() {
    this.index = -1;
    this.stepList = [];
    this.stepStack = [];
    this.dataStack = [];
    this.stepChange?.();

    return this;
  }

  static onComplete(callback: (data?: PlayerActionStepData[]) => void) {
    this.complete = callback;
  }

  static onCancel(callback: (data?: PlayerActionStepData[]) => void) {
    this.cancel = callback;
  }

  static onStepChange(callback: (data?: PlayerActionStepData[]) => void) {
    this.stepChange = callback;
  }
}
