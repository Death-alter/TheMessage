import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

export interface NodeActionItem {
  node: Node;
  actionQueue: Array<AttributeAction | AttributeAction[]>;
  current: number;
  isActive: boolean;
}

export interface AttributeAction {
  attribute: string;
  from?: number;
  to: number;
  duration?: number;
  easing?: (t: number) => number;
}

export interface ActiveAction {
  uuid: string;
  startTime: number;
  pauseStartTime?: number;
  pausedTime?: number;
}

@ccclass("NodeAction")
export class NodeAction extends Component {
  private items: { [index: string]: NodeActionItem } = {};
  private actionList: ActiveAction[] = []; //正在执行的action列表

  addItem(node: Node, action?: AttributeAction | AttributeAction[]) {
    this.items[node.uuid] = {
      node,
      current: 0,
      actionQueue: action ? [action] : [],
      isActive: false,
    };
  }

  //添加一个/组action，如果当前有action，则清空所有action
  setAction(node: Node, action: AttributeAction | AttributeAction[]) {
    const item = this.items[node.uuid];
    if (item) {
      this.stopAction(node.uuid);
      item.actionQueue = [action];
    } else {
      this.addItem(node, action);
    }
  }

  //添加一个/组action，和某个/组action同时执行，默认为最后一个/组
  mixAction(node: Node, action: AttributeAction | AttributeAction[], index?: number) {
    const item = this.items[node.uuid];
    if (this.items[node.uuid]) {
      if (index == null || index < 0 || index >= item.actionQueue.length) index = item.actionQueue.length - 1;
      let arr = [];
      if (item.actionQueue[index] instanceof Array) {
        arr = [...(<AttributeAction[]>item.actionQueue[index])];
      } else {
        arr = [item.actionQueue[index]];
      }
      if (action instanceof Array) {
        arr = [...arr, ...(<AttributeAction[]>action)];
      } else {
        arr = [...arr, action];
      }
      item.actionQueue[index] = arr;
    } else {
      this.addItem(node, action);
    }
  }

  //添加一个/组action，添加到action最后
  appendAction(node: Node, action: AttributeAction | AttributeAction[]) {
    const item = this.items[node.uuid];
    if (item) {
      item.actionQueue = [...item.actionQueue, action];
    } else {
      this.addItem(node, action);
    }
  }

  startAction(uuid: string) {
    const item = this.items[uuid];
    if (!item.actionQueue.length) return;
    item.isActive = true;
    this.actionList.push({
      uuid,
      startTime: new Date().getTime(),
    });
  }

  //停止某个节点的action
  stopAction(uuid: string) {
    this.items[uuid].isActive = false;
  }

  //暂停某个节点的action
  pauseAction(uuid: string) {
    this.items[uuid].isActive = false;
  }

  private apf(node: Node, action: AttributeAction) {}

  protected update(dt: number): void {
    if (this.actionList.length) {
      for (let activeAction of this.actionList) {
        const item = this.items[activeAction.uuid];
        const action = item.actionQueue[item.current];
        if (action instanceof Array) {
          for (let a of action) {
            this.apf(item.node, a);
          }
        } else {
          this.apf(item.node, action);
        }
      }
    }
  }
}
