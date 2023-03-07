import { _decorator, Component, Label, Graphics, tween, UIOpacity } from "cc";
import EventTarget from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/types";
const { ccclass, property } = _decorator;

@ccclass("ErrorLog")
export class ErrorLog extends Component {
  start() {
    const g = this.node.getChildByName("Graphics").getComponent(Graphics);
    g.fillColor.fromHEX("#00000088");
    g.roundRect(-40, -20, 80, 40, 5);
    g.stroke();
    g.fill();

    const label = this.node.getChildByName("Label");
    EventTarget.on(ProcessEvent.NETWORK_ERROR, (data) => {
      label.getComponent(Label).string = data.msg;
      this.show();
      setTimeout(() => {
        this.hide();
      }, 2000);
    });
    this.node.active = false;
  }

  show() {
    this.node.active = true;
    this.node.setSiblingIndex(-1);
    const target = this.getComponent(UIOpacity);
    target.opacity = 255;
    tween(target.opacity).to(0.5, 0, {
      onUpdate: (data) => {
        console.log(1);
      },
    });
  }

  hide() {
    const target = this.getComponent(UIOpacity);
    target.opacity = 0;
    tween(target.opacity).to(0.5, 255);
    this.node.active = false;
  }
}
