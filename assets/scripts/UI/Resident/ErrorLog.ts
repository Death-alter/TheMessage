import { _decorator, Component, Label, Graphics, tween, UIOpacity, Node, UITransform, Size, Tween } from "cc";
import {ProcessEventCenter} from "../../Event/EventTarget";
import { ProcessEvent } from "../../Event/type";
const { ccclass, property } = _decorator;

@ccclass("ErrorLog")
export class ErrorLog extends Component {
  private _mask: Node | null = null;
  private _label: Node | null = null;
  private _opacityTarget: UIOpacity | null = null;
  private _action: Tween<any> = null;

  start() {
    this._label = this.node.getChildByName("Label");
    this._mask = this.node.getChildByName("Mask");
    this._opacityTarget = this.getComponent(UIOpacity);

    ProcessEventCenter.on(ProcessEvent.NETWORK_ERROR, (data) => {
      const labelComp = this._label.getComponent(Label);
      labelComp.string = data.msg;
      const width = data.msg.length * labelComp.fontSize + 20;
      this._mask.getComponentInChildren(UITransform).setContentSize(new Size(width, 40));
      this.drawMask(width, 40, 5);
      this.show();
    });
    tween(this._opacityTarget).hide().start();
  }

  show(seconds = 2) {
    if (this._action !== null) this._action.stop();
    this.node.setSiblingIndex(-1);
    this._opacityTarget.opacity = 0;
    this._action = tween(this._opacityTarget)
      .show()
      .to(0.5, { opacity: 255 }, { easing: "fade" })
      .delay(seconds)
      .to(0.5, { opacity: 0 }, { easing: "fade" })
      .start();
  }

  drawMask(width, height, radius) {
    const g = this._mask.getComponent(Graphics);
    g.fillColor.fromHEX("#00000088");
    g.roundRect(-width / 2, -height / 2, width, height, radius);
    g.stroke();
    g.fill();
  }
}
