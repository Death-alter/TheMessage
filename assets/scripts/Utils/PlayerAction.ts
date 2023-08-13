export interface metaAction {
  name?: string;
  handler: (params?: any) => Promise<any>;
}

export class PlayerAction {
  private actions: metaAction[];
  private index: number = 0;
  public complete: (params?) => void;
  public cancel: (params?) => void;

  get steps() {
    return this.actions.length;
  }

  get currentStep() {
    return this.index;
  }

  constructor(option: { actions: metaAction[]; complete?: (params?) => void; cancel?: (params?) => void }) {
    this.actions = option.actions;
    if (option.complete) {
      this.complete = option.complete;
    }
    if (option.cancel) {
      this.cancel = option.cancel;
    }
  }

  handleAction(params?) {
    this.actions[this.index]
      .handler(params)
      .then((data) => {
        this.next(data);
      })
      .catch((e) => {
        if (e instanceof Error) {
          throw e;
        } else {
          this.prev(e);
        }
      });
  }

  start(params?) {
    this.reset();
    this.handleAction(params);
  }

  reset() {
    this.index = 0;
  }

  next(params?) {
    if (this.index < this.actions.length - 1) {
      ++this.index;
      this.handleAction(params);
    } else {
      if (this.complete) {
        this.complete(params);
        this.reset();
      }
    }
  }

  prev(params?) {
    if (this.index > 0) {
      --this.index;
      this.handleAction(params);
    } else {
      if (this.cancel) {
        this.cancel();
      }
    }
  }

  switchTo(step: number);
  switchTo(actionName: string);
  switchTo(index: number | string) {
    if (typeof index === "number") {
      this.index = index;
      this.handleAction();
    } else {
      for (let i = 0; i < this.actions.length; i++) {
        const action = this.actions[i];
        if (action.name === index) {
          this.index = i;
          this.handleAction();
          break;
        }
      }
    }
  }

  union(action: PlayerAction) {
    this.actions = [...this.actions, ...action.actions];
    this.complete = action.complete;
    this.cancel = action.cancel;
    return this;
  }
}

interface PlayerActionManagerOption {
  onclear: () => void;
  onswitch: () => void;
}

export class PlayerActionManager {
  private defaultAction: PlayerAction;
  private currentAction: PlayerAction;
  private onclear: () => void;
  private onswitch: () => void;

  constructor(option: PlayerActionManagerOption) {
    this.onclear = option.onclear;
    this.onswitch = option.onswitch;
  }

  setDefaultAction(action: PlayerAction) {
    this.defaultAction = action;
  }

  switchToDefault() {
    if (!this.defaultAction) return;
    this.onswitch();
    this.defaultAction.reset();
    this.defaultAction.start();
  }

  switchTo(action: PlayerAction) {
    this.currentAction = action;
    this.onswitch();
    this.currentAction.reset();
    this.currentAction.start();
  }

  clearAction() {
    this.defaultAction = null;
    this.currentAction = null;
    this.onclear();
  }
}
