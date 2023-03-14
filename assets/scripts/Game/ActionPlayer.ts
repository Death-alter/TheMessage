import { _decorator, Component, tween, Tween, Node, Vec3, TweenEasing, ITweenOption } from "cc";
const { ccclass, property } = _decorator;

interface ActionMapItem {
  isPlaying: boolean;
  previousParent: Node;
  previousPosition: Vec3;
  node: Node;
  action?: Tween<any>;
}

@ccclass("ActionPlayer")
export class ActionPlayer extends Component {
  nodeMap: { [index: string]: ActionMapItem } = {};

  isPlayingAction(node: Node) {
    return this.nodeMap[node.uuid] && this.nodeMap[node.uuid].isPlaying;
  }

  addNode(node: Node) {
    if (!this.nodeMap[node.uuid]) {
      this.nodeMap[node.uuid] = {
        isPlaying: false,
        previousParent: node.parent,
        previousPosition: node.worldPosition,
        node: node,
      };
    }
  }

  reset(node: Node) {
    node.setWorldPosition(this.nodeMap[node.uuid].previousPosition);
    node.setParent(this.nodeMap[node.uuid].previousParent);
  }

  hide(node: Node) {
    node.active = false;
  }

  remove(node: Node) {
    node.removeFromParent();
  }

  stopAction(node: Node) {
    if (this.nodeMap[node.uuid].action) {
      this.nodeMap[node.uuid].action?.stop();
      this.nodeMap[node.uuid].isPlaying = false;
    }
  }

  startAction(node: Node) {
    if (this.nodeMap[node.uuid].action) {
      this.nodeMap[node.uuid].isPlaying = true;
      this.nodeMap[node.uuid].action.start();
    }
  }

  private _setAction(node: Node, action: Tween<any>) {
    if (!this.nodeMap[node.uuid].action) {
      this.nodeMap[node.uuid].action = action;
    } else {
      this.nodeMap[node.uuid].action = tween(node).parallel(this.nodeMap[node.uuid].action, action).start();
    }
  }

  createTween(node: Node, propName: string, from: any, to: any, seconds: number, option: ITweenOption) {
    this.addNode(node);
    node.setParent(this.node);
    node[propName] = from;
    const props = {};
    props[propName] = to;
    const t = tween(node).to(seconds, props, option);
    this._setAction(node, t);
    return t;
  }

  move(
    node: Node,
    from: Vec3,
    to: Vec3,
    seconds: number,
    easing?: TweenEasing | ((k: number) => number),
    immediately: boolean = true
  ) {
    return new Promise((reslove, reject) => {
      if (this.isPlayingAction(node)) reject("正在播放动画");
      this.addNode(node);
      node.setParent(this.node);
      const t = this.createTween(node, "worldPosition", from, to, seconds, {
        easing,
        onComplete: () => {
          this.nodeMap[node.uuid].isPlaying = false;
          reslove({
            reset: () => {
              this.reset(node);
              delete this.nodeMap[node.uuid];
            },
            hide: () => {
              this.hide(node);
              delete this.nodeMap[node.uuid];
            },
            remove: () => {
              this.remove(node);
              delete this.nodeMap[node.uuid];
            },
          });
        },
      });
      if (immediately) {
        this.nodeMap[node.uuid].isPlaying = true;
        t.start();
      }
    });
  }

  scale(
    node: Node,
    from: Vec3,
    to: Vec3,
    seconds: number,
    easing?: TweenEasing | ((k: number) => number),
    immediately: boolean = true
  ) {
    if (this.isPlayingAction(node)) new Promise(() => {});
    this.addNode(node);
    node.setParent(this.node);
    return new Promise((reslove, reject) => {
      const t = this.createTween(node, "scale", from, to, seconds, {
        easing,
        onComplete: () => {
          this.nodeMap[node.uuid].isPlaying = false;
          reslove({
            reset: () => {
              this.reset(node);
              delete this.nodeMap[node.uuid];
            },
            hide: () => {
              this.hide(node);
              delete this.nodeMap[node.uuid];
            },
            remove: () => {
              this.remove(node);
              delete this.nodeMap[node.uuid];
            },
          });
        },
      });
      if (immediately) {
        this.nodeMap[node.uuid].isPlaying = true;
        t.start();
      }
    });
  }
}
