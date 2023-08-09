export interface metaAction {
  name?: string;
  handler: (params?: any) => Promise<any>;
}

export class PlayerAction {
  private actions: metaAction[];
  private index: number = 0;
  private complete: (params?) => void;
  private cancel: (params?) => void;

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

  union(action: PlayerAction | metaAction[]) {
    if (action instanceof PlayerAction) {
      action = action.actions;
    }
    this.actions = [...this.actions, ...action];
  }
}

interface PlayerActionManagerOption {
  onclear: () => void;
  onswitch: () => void;
}

export class PlayerActionManager {
  private defaultAction: PlayerAction;
  private defaultController: (action: PlayerAction) => void;
  private currentAction: PlayerAction;
  private currentController: (action: PlayerAction) => void;
  private onclear: () => void;
  private onswitch: () => void;

  constructor(option: PlayerActionManagerOption) {
    this.onclear = option.onclear;
    this.onswitch = option.onswitch;
  }

  setDefaultAction(action: PlayerAction, controller?: (action: PlayerAction) => void) {
    this.defaultAction = action;
    if (controller) {
      this.defaultController = controller;
    }
  }

  switchToDefault() {
    this.onswitch();
    this.defaultController && this.defaultController(this.defaultAction);
    this.defaultAction.reset();
    this.defaultAction.start();
  }

  switchTo(action: PlayerAction, controller?: (action: PlayerAction) => void) {
    this.currentAction = action;
    if (controller) {
      this.currentController = controller;
    }
    this.onswitch();
    this.currentController && this.currentController(this.currentAction);
    this.currentAction.reset();
    this.currentAction.start();
  }

  clearAction() {
    this.defaultAction = null;
    this.currentAction = null;
    this.onclear();
  }
}
