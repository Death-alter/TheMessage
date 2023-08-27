import { PlayerActionStepManager } from "./PlayerActionStepManager";
import { PlayerActionStep, PlayerActionStepNextParams, PlayerActionStepData } from "./PlayerActionStep";

export abstract class PlayerAction {
  private static index: number = -1;
  private static stepList: PlayerActionStep[] = [];
  private static dataList: { [index: string]: any }[] = [];

  private static stepStack: PlayerActionStep[] = [];
  private static dataStack: { [index: string]: any }[] = [];

  private static complete: (data?: { [index: string]: any }[]) => void;
  private static cancel: (data?: { [index: string]: any }[]) => void;

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

  static start({ step, data }: PlayerActionStepNextParams) {
    let nextStep;
    if (step) {
      if (step instanceof PlayerActionStep) {
        nextStep = step;
      } else {
        nextStep = PlayerActionStepManager.getStep(step);
      }
    } else {
      ++this.index;
      nextStep = this.stepList[this.index];
    }

    if (!nextStep) {
      return;
    }

    this.stepStack.push(this.stepList[this.index]);
    this.dataStack.push(data);
    this.handleStep();

    return this;
  }

  static next({ step, data }: PlayerActionStepNextParams) {
    let nextStep;
    if (step) {
      if (step instanceof PlayerActionStep) {
        nextStep = step;
      } else {
        nextStep = PlayerActionStepManager.getStep(step);
      }
    } else {
      ++this.index;
      nextStep = this.stepList[this.index];
    }

    this.dataStack.push(data);

    if (!nextStep) {
      this.complete?.(this.dataStack);
    } else {
      this.stepStack.push(nextStep);
      this.handleStep();
    }

    return this;
  }

  static prev() {
    this.dataStack.pop();
    if (this.stepStack.length > 0) {
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

  private static stepNext(data: { [index: string]: any }) {
    if (this.index >= this.stepList.length) {
      this.complete?.(this.dataStack);
    } else {
      this.stepStack.push(this.stepList[this.index]);
      this.dataStack.push(data);
      this.handleStep();
    }
  }

  private static handleStep() {
    if (this.currentStep === this.stepList[this.index]) {
      this.currentStep.handler(
        {
          initial: this.dataList[this.index],
          current: this.currentStep.resolver ? this.currentStep.resolver(this.currentData) : this.currentData,
        },
        {
          next: this.stepNext.bind(this),
          prev: this.prev.bind(this),
        }
      );
    } else {
      this.currentStep.handler(
        {
          current: this.currentStep.resolver ? this.currentStep.resolver(this.currentData) : this.currentData,
        },
        {
          next: this.stepNext.bind(this),
          prev: this.prev.bind(this),
        }
      );
    }
  }

  static addStep(step: string | PlayerActionStep, data?: { [index: string]: any }) {
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
    this.dataList.push(data);

    return this;
  }

  static clear() {
    this.index = -1;
    this.stepList = [];
    this.stepStack = [];
    this.dataStack = [];
    this.dataList = [];

    return this;
  }

  static onComplete(callback: (data?: { [index: string]: any }[]) => void) {
    this.complete = callback;
  }

  static onCancel(callback: (data?: { [index: string]: any }[]) => void) {
    this.cancel = callback;
  }
}
