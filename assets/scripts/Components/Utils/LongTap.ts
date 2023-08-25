import { _decorator, Component, Node, sys } from "cc";
const { ccclass, property } = _decorator;

@ccclass("LongTap")
export class LongTap extends Component {
  private touchStartTime: number;
  private isOnTouch: boolean;

  onEnable() {
    if (sys.isMobile) {
      this.node.on(Node.EventType.TOUCH_START, () => {
        this.touchStartTime = new Date().getTime();
        this.isOnTouch = true;
      });
      this.node.on(Node.EventType.TOUCH_END, (event) => {
        if (this.isOnTouch) {
          const deltaTime = new Date().getTime() - this.touchStartTime;
          if (deltaTime > 500) {
            this.node.emit("longtap", event);
          }
        }
      });
      this.node.on(Node.EventType.TOUCH_CANCEL, () => {
        this.touchStartTime = 0;
        this.isOnTouch = false;
      });
    }
  }

  onDisable() {
    if (sys.isMobile) {
      this.node.off(Node.EventType.TOUCH_START);
      this.node.off(Node.EventType.TOUCH_END);
      this.node.off(Node.EventType.TOUCH_CANCEL);
    }
  }
}
