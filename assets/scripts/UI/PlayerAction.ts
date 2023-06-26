export interface metaAction {
  name?: string;
  handler: (params?: any) => Promise<any>;
}

export class PlayerAction {
  private actions: metaAction[];
  private index: number = 0;
  private complete: () => void;
  private cancel: () => void;

  get steps() {
    return this.actions.length;
  }

  get currentStep() {
    return this.index;
  }

  constructor(option: { actions: metaAction[]; complete?: () => void; cancel?: () => void }) {
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
    this.index = 0;
    this.handleAction(params);
  }

  next(params?) {
    if (this.index < this.actions.length - 1) {
      ++this.index;
      this.handleAction(params);
    } else {
      if (this.complete) {
        this.complete();
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
}
