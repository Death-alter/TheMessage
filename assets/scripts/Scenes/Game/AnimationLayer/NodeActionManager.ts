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
  isLast: boolean;
}

export interface ActiveAction {
  uuid: string;
  startTime: number;
  pauseStartTime?: number;
  pausedTime?: number;
}

@ccclass("NodeActionManager")
export class NodeActionManager extends Component {
  private items: { [index: string]: NodeActionItem } = {};
  private actionList: ActiveAction[] = []; //正在执行的action列表

  private addItem(node: Node, action?: AttributeAction | AttributeAction[]) {
    this.items[node.uuid] = {
      node,
      current: 0,
      actionQueue: action ? [action] : [],
      isActive: false,
    };
    this.node.addChild(node);
  }

  private removeItem(node: Node | string) {
    if (typeof node === "string") {
      this.node.removeChild(this.items[node].node);
      delete this.items[node];
    } else {
      this.node.removeChild(node);
      delete this.items[node.uuid];
    }
  }

  private addAction(uuid: string, action: AttributeAction | AttributeAction[], index: number, clearCurrent?: boolean);
  private addAction(node: Node, action: AttributeAction | AttributeAction[], index: number, clearCurrent?: boolean);
  private addAction(
    node: Node | string,
    action: AttributeAction | AttributeAction[],
    index: number,
    clearCurrent: boolean = false
  ) {
    if (typeof node === "string") {
      if (!this.items[node]) return;
    } else {
      if (!this.items[node.uuid]) this.addItem(node, action);
    }
    const item = this.items[(<Node>node).uuid];
    if (!(action instanceof Array)) {
      action = [action];
    }
    if (clearCurrent) {
      this.clearAction(item.node);
      item.actionQueue[0] = action.length === 1 ? action[0] : action;
    } else {
      if (item.actionQueue[index] instanceof Array) {
        item.actionQueue[index] = [...(<AttributeAction[]>item.actionQueue[index]), ...action];
      } else {
        item.actionQueue[index] = [<AttributeAction>item.actionQueue[index], ...action];
      }
    }
  }

  private clearAction(node: Node);
  private clearAction(uuid: string);
  private clearAction(uuid: Node | string) {
    if (typeof uuid !== "string") {
      this.items[uuid.uuid].actionQueue = [];
    } else {
      this.items[uuid].actionQueue = [];
    }
  }

  //添加一个/组action，如果当前有action，则清空所有action
  setAction(node: Node, action: AttributeAction | AttributeAction[]) {
    this.addAction(node, action, 0, true);
  }

  //添加一个/组action，和某个/组action同时执行，默认为最后一个/组
  mixAction(node: Node, action: AttributeAction | AttributeAction[], index?: number) {
    if (!index) {
      index = this.items[node.uuid].actionQueue.length - 1;
    }
    this.addAction(node, action, index);
  }

  //添加一个/组action，添加到action最后
  appendAction(node: Node, action: AttributeAction | AttributeAction[]) {
    this.addAction(node, action, this.items[node.uuid].actionQueue.length);
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

  private apf(node: Node, action: AttributeAction, t: number) {
    const p = 1 - t / (action.duration * 1000);
    if (p < 0) return false;
    node[action.attribute] = (1 - p) * action.from + p * action.to;
    return true;
  }

  protected update(dt: number): void {
    if (!this.actionList.length) return;

    const t = new Date().getTime();
    for (let i = 0; i < this.actionList.length; i++) {
      const activeAction = this.actionList[i];
      const item = this.items[activeAction.uuid];
      const action = item.actionQueue[item.current];
      if (!action) {
        this.stopAction(item.node.uuid);
        this.actionList.splice(i, 1);
        --i;
        //动画队列全部结束
      }
      let completed = true;
      if (action instanceof Array) {
        for (let a of action) {
          const flag = this.apf(item.node, a, t - activeAction.startTime);
          if (flag) completed = false;
        }
      } else {
        completed = !this.apf(item.node, action, t - activeAction.startTime);
      }
      if (completed) {
        //单个动画结束
        ++item.current;
      }
    }
  }
}
