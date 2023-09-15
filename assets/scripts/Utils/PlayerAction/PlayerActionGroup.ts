import { PlayerActionStepManager } from "./PlayerActionStepManager";
import { PlayerActionStep, PlayerActionStepDataResolver } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";

export class PlayerActionGroup {
  private index: number = -1;
  private _direction: number = 0;
  private stepList: PlayerActionStep[] = [];

  private dataList: { [index: string]: any }[] = [];

  get direction() {
    return this._direction;
  }

  constructor() {}

  next(data?: { [index: string]: any }) {
    this._direction = 0;
    if (this.stepList[this.index] && this.stepList[this.index].resolver) {
      data = this.stepList[this.index].resolver(data);
    }

    ++this.index;
    if (!this.dataList[this.index]) {
      this.dataList[this.index] = {};
    }

    this.dataList[this.index].current = { index: this.index, ...data } || { index: this.index };
    
    if (this.index >= this.stepList.length) {
      return false;
    } else {
      return true;
    }
  }

  prev() {
    this._direction = 1;
    this.dataList[this.index].current = {};
    --this.index;
    if (this.index < this.stepList.length) {
      this.dataList = this.dataList.slice(0, this.stepList.length);
    }

    if (this.index < 0) {
      return false;
    } else {
      return true;
    }
  }

  public handleStep(fs) {
    console.log(this.stepList);
    this.stepList[this.index].handler(this.dataList[this.index], fs);
  }

  private resolveStep(step: PlayerActionStep | PlayerActionStepName, resolver) {
    if (step instanceof PlayerActionStep) {
      return step;
    } else {
      return PlayerActionStepManager.getStep(step, resolver);
    }
  }

  start(callback) {
    if (!this.stepList.length) {
      return;
    }
    this.index = 0;
    this.dataList[this.index].current = { index: this.index };
    callback();
  }

  getData() {
    return [...this.dataList].reverse().map((item) => item.current);
  }

  addStep({
    step,
    data,
    resolver,
  }: {
    step: PlayerActionStep | PlayerActionStepName;
    data?: { [index: string]: any };
    resolver?: PlayerActionStepDataResolver;
  }) {
    this.stepList.push(this.resolveStep(step, resolver));
    this.dataList.push({ initial: data || {} });
  }

  clear() {
    this.index = -1;
    this._direction = 0;
    this.stepList = [];
    this.dataList = [];
  }
}
