import { _decorator, Component, Graphics, CCInteger, EventTouch, NodeEventType } from "cc";
const { ccclass, property } = _decorator;

@ccclass("TouchPenetration")
export default class TouchPenetration extends Component {
  onEnable() {
    this.node.on(
      NodeEventType.TOUCH_START,
      (event: EventTouch) => {
        event.preventSwallow = true;
      },
      this
    );

    this.node.on(
      NodeEventType.TOUCH_CANCEL,
      (event: EventTouch) => {
        event.preventSwallow = true;
      },
      this
    );

    this.node.on(
      NodeEventType.TOUCH_MOVE,
      (event: EventTouch) => {
        event.preventSwallow = true;
      },
      this
    );

    this.node.on(
      NodeEventType.TOUCH_END,
      (event: EventTouch) => {
        event.preventSwallow = true;
      },
      this
    );
  }
}
