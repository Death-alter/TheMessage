import { PlayerActionStep, PlayerActionStepDataResolver } from "./PlayerActionStep";
import { PlayerActionStepName } from "./type";
import { PlayerActionGroup } from "./PlayerActionGroup";
import { GameManager } from "../../Manager/GameManager";

export abstract class PlayerAction {
  private static gui: GameManager;
  private static _index: number = 0;
  private static groups: { [index: string]: PlayerActionGroup } = { default: new PlayerActionGroup() };
  private static groupKeys: string[] = ["default"];

  private static complete: (data?: { [index: string]: any }[]) => void;
  private static cancel: () => void;
  private static switch: () => void;

  private static get currentGroup() {
    return this.groups[this.groupKeys[this.index]];
  }

  private static get index() {
    return this._index;
  }

  private static set index(n) {
    if (n != null && n !== this._index) this._index = n;
    if (this.switch) {
      this.switch();
      this.switch = null;
    }
  }

  public static init(gui: GameManager) {
    this.gui = gui;
  }

  public static dispose() {
    this.gui = null;
  }

  public static switchToGroup(index: number): typeof PlayerAction;
  public static switchToGroup(groupName: string): typeof PlayerAction;
  public static switchToGroup(key: string | number): typeof PlayerAction {
    if (typeof key === "number") {
      if (key < 0 || key >= this.groupKeys.length) return;
      this.index = key;
    } else {
      if (this.groups[key]) {
        this.index = this.getGroupIndex(key);
      } else {
        this.groups[key] = new PlayerActionGroup();
        this.groupKeys.push(key);
        ++this.index;
      }
    }
    return this;
  }

  public static getGroupIndex(groupName: string) {
    return this.groupKeys.indexOf(groupName);
  }

  public static clearGroup(groupName) {
    if (this.groups[groupName]) this.groups[groupName].clear();
    return this;
  }

  public static clear() {
    this.index = 0;
    this.groups = { default: new PlayerActionGroup() };
    this.groupKeys = ["default"];
    this.cancel = null;
    this.complete = null;
    this.switch = null;
    return this;
  }

  public static next(data?: { [index: string]: any }) {
    this.gui.gameLayer.lockSelectHandCards();
    this.gui.gameLayer.lockSelectPlayers();
    const flag = this.currentGroup.next(data);
    if (flag) {
      this.handleStep();
    } else {
      if (this.index >= this.groupKeys.length - 1) {
        this.complete && this.complete(this.currentGroup.getData());
      } else {
        ++this.index;
        this.handleStep();
      }
    }
    return this;
  }

  public static prev() {
    this.gui.gameLayer.stopSelectHandCards();
    this.gui.gameLayer.stopSelectPlayers();
    const flag = this.currentGroup.prev();
    if (flag) {
      this.handleStep();
    } else {
      if (this.index <= 0) {
        this.cancel && this.cancel();
      } else {
        --this.index;
        const key = this.groupKeys.pop();
        delete this.groups[key];
        if (this.groupKeys.length > 1) {
          this.prev();
        } else {
          this.handleStep();
        }
      }
    }
    return this;
  }

  private static passOnNext(f: () => void) {
    if (this.currentGroup.direction === 1) {
      f();
    } else {
      this.next();
    }
  }

  private static passOnPrev(f: () => void) {
    if (this.currentGroup.direction === 0) {
      f();
    } else {
      this.prev();
    }
  }

  public static start() {
    this.currentGroup.start(this.handleStep.bind(this));
    return this;
  }

  public static addStep({
    step,
    data,
    resolver,
  }: {
    step: PlayerActionStep | PlayerActionStepName;
    data?: { [index: string]: any };
    resolver?: PlayerActionStepDataResolver;
  }) {
    this.currentGroup.addStep({ step, data, resolver });
    return this;
  }

  private static handleStep() {
    this.currentGroup.handleStep({
      next: this.next.bind(this),
      prev: this.prev.bind(this),
      passOnNext: this.passOnNext.bind(this),
      passOnPrev: this.passOnPrev.bind(this),
    });
  }

  public static onComplete(callback: (data?: { [index: string]: any }[]) => void) {
    this.complete = callback;
    return this;
  }

  public static onCancel(callback: () => void) {
    this.cancel = callback;
    return this;
  }

  public static onSwitch(callback: () => void) {
    this.switch = callback;
    return this;
  }
}
