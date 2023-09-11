import { PlayerActionStepManager } from "./PlayerActionStepManager";
import { PlayerActionStep, PlayerActionStepDataResolver } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";

export abstract class PlayerAction {
  private static index: number = -1;
  private static direction: number = 0;
  private static list: PlayerActionStep[] = [];
  private static tempList: PlayerActionStep[] = [];

  private static dataList: { [index: string]: any }[] = [];

  private static complete: (data?: { [index: string]: any }[]) => void;
  private static tempComplete: (data?: { [index: string]: any }[]) => void;
  private static cancel: () => void;
  private static tempCancel: () => void;

  private static get stepList() {
    return [...this.list, ...this.tempList];
  }

  static next(data?: { [index: string]: any }) {
    this.direction = 0;
    if (this.stepList[this.index] && this.stepList[this.index].resolver) {
      data = this.stepList[this.index].resolver(data);
    }

    ++this.index;
    if (!this.dataList[this.index]) {
      this.dataList[this.index] = {};
    }

    this.dataList[this.index].current = { index: this.index, ...data } || { index: this.index };

    if (this.index >= this.stepList.length) {
      this.end();
    } else {
      this.handleStep();
    }
  }

  private static prev() {
    this.direction = 1;
    console.log(this.index);
    console.log(this.dataList);
    this.dataList[this.index].current = {};
    --this.index;
    if (this.index < this.list.length) {
      this.tempList = [];
      this.dataList = this.dataList.slice(0, this.list.length);
      this.tempCancel && this.tempCancel();
    }

    if (this.index < 0) {
      this.cancel && this.cancel();
    } else {
      this.handleStep();
    }
  }

  private static passOnNext(f: () => void) {
    if (this.direction === 1) {
      f();
    } else {
      this.next();
    }
  }

  private static passOnPrev(f: () => void) {
    if (this.direction === 0) {
      f();
    } else {
      this.prev();
    }
  }

  private static handleStep() {
    this.stepList[this.index].handler(this.dataList[this.index], {
      next: this.next.bind(this),
      prev: this.prev.bind(this),
      passOnNext: this.passOnNext.bind(this),
      passOnPrev: this.passOnPrev.bind(this),
      end: this.end.bind(this),
    });
  }

  private static resolveStep(step: PlayerActionStep | PlayerActionStepName, resolver) {
    if (step instanceof PlayerActionStep) {
      return step;
    } else {
      return PlayerActionStepManager.getStep(step, resolver);
    }
  }

  static start() {
    if (!this.stepList.length) {
      return;
    }
    this.index = 0;
    this.dataList[this.index].current = { index: this.index };
    this.handleStep();

    return this;
  }

  static end(data?: { [index: string]: any }) {
    if (data) {
      this.dataList[this.index].current = { index: this.index, ...data } || { index: this.index };
    }
    const d = [...this.dataList].reverse().map((item) => item.current);

    console.log(this.tempList, this.tempComplete, this.complete);
    console.log(this.tempComplete);
    console.log(this.complete);
    if (this.tempList.length > 0) {
      this.tempComplete && this.tempComplete(d);
    } else {
      console.log(d, this.complete);
      this.complete && this.complete(d);
    }
  }

  static addStep({
    step,
    data,
    resolver,
  }: {
    step: PlayerActionStep | PlayerActionStepName;
    data?: { [index: string]: any };
    resolver?: PlayerActionStepDataResolver;
  }) {
    if (this.tempList.length > 0) {
      throw new Error("有tempStep的时候不能添加step");
    }
    this.list.push(this.resolveStep(step, resolver));
    this.dataList.push({ initial: data || {} });

    return this;
  }

  static addTempStep({
    step,
    data,
    resolver,
  }: {
    step: PlayerActionStep | PlayerActionStepName;
    data?: { [index: string]: any };
    resolver?: PlayerActionStepDataResolver;
  }) {
    this.tempList.push(this.resolveStep(step, resolver));
    this.dataList.push({ initial: data || {} });

    return this;
  }

  static clearTemp() {
    while (this.index >= this.list.length) {
      this.prev();
    }
  }

  static clear() {
    this.index = -1;
    this.direction = 0;
    this.list = [];
    this.tempList = [];
    this.dataList = [];
    this.complete = null;
    this.tempComplete = null;
    this.cancel = null;
    this.tempCancel = null;

    return this;
  }

  static onComplete(callback: (data?: { [index: string]: any }[]) => void) {
    if (this.tempList.length > 0) {
      this.tempComplete = callback;
    } else {
      this.complete = callback;
    }
    return this;
  }

  static onCancel(callback: () => void) {
    if (this.tempList.length > 0) {
      this.tempCancel = callback;
    } else {
      this.cancel = callback;
    }
    return this;
  }
}
