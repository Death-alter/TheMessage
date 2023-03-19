import EventTarget from "./EventTarget";
import { ProcessEvent, GameEvent, NetworkEventToS } from "./type";

interface ChainItem {
  eventName: ProcessEvent | GameEvent | NetworkEventToS;
  data?: { [index: string]: any };
  callback?: (...args: any[]) => void;
}

export class EventChain {
  private _chain: ChainItem[] = [];

  constructor(chain: ChainItem[]) {
    this._chain = chain;
  }

  push(item: ChainItem) {
    this._chain.push(item);
  }

  pop(): ChainItem {
    return this._chain.pop();
  }

  executeChain(i) {
    return new Promise((resolve, reject) => {
      if (this._chain[i].eventName in NetworkEventToS) {
        EventTarget.emit(this._chain[i].eventName, this._chain[i].data);
        resolve(this._chain[i].data);
      } else {
        EventTarget.on(this._chain[i].eventName, (data) => {
          this._chain[i].callback(data);
          resolve(data);
        });
      }
    });
  }

  start() {
    let i = 0;
    let chain = this.executeChain(i);
    while (i < this._chain.length) {
      ++i;
      chain.then((data) => {
        return this.executeChain(i);
      });
    }
  }
}
