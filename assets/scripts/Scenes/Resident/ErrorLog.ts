import { _decorator, Component, Label, Graphics, UIOpacity, Node, UITransform, Size } from "cc";
import { NetworkEventCenter, ProcessEventCenter } from "../../Event/EventTarget";
import { NetworkEventToC, ProcessEvent } from "../../Event/type";
import { KeyframeAnimationManager } from "../Game/AnimationLayer/KeyframeAnimation";
const { ccclass, property } = _decorator;

@ccclass("ErrorLog")
export class ErrorLog extends Component {
  private _mask: Node | null = null;
  private _label: Node | null = null;
  private _opacityTarget: UIOpacity | null = null;

  onLoad() {
    this._label = this.node.getChildByName("Label");
    this._mask = this.node.getChildByName("Mask");
    this._opacityTarget = this.getComponent(UIOpacity);
    this._opacityTarget.opacity = 0;

    ProcessEventCenter.on(ProcessEvent.NETWORK_ERROR, (data) => {
      const labelComp = this._label.getComponent(Label);
      labelComp.string = data.msg;
      const width = data.msg.length * labelComp.fontSize + 20;
      this._mask.getComponentInChildren(UITransform).setContentSize(new Size(width, 40));
      this.drawMask(width, 40, 5);
      this.show();
    });

    NetworkEventCenter.on(NetworkEventToC.NOTIFY_KICKED_TOC, () => {
      const labelComp = this._label.getComponent(Label);
      const msg = "该账号已在其他设备登录";
      labelComp.string = msg;
      const width = msg.length * labelComp.fontSize + 20;
      this._mask.getComponentInChildren(UITransform).setContentSize(new Size(width, 40));
      this.drawMask(width, 40, 5);
      this.show();
    });
  }

  show(seconds = 1) {
    KeyframeAnimationManager.playAnimation(
      {
        target: this._opacityTarget,
        animation: [
          {
            attribute: "opacity",
            from: 0,
            to: 255,
            duration: 0.5,
            easing: "fade",
          },
          {
            attribute: "opacity",
            to: 0,
            startTime: seconds + 0.5,
            duration: 0.5,
            easing: "fade",
          },
        ],
      },
      null,
      "clear",
    )
      .on(0, () => {
        this.node.active = true;
        this.node.setSiblingIndex(-1);
      })
      .on(seconds + 1, () => {
        this.node.active = false;
      });
  }

  drawMask(width, height, radius) {
    const g = this._mask.getComponent(Graphics);
    g.fillColor.fromHEX("#00000088");
    g.roundRect(-width / 2, -height / 2, width, height, radius);
    g.stroke();
    g.fill();
  }
}
