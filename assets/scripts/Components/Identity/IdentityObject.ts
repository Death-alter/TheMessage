import { _decorator, Sprite, Label, color } from "cc";
import { GameObject } from "../../GameObject";
import { Identity } from "./Identity";
import { NoIdentity } from "./IdentityClass/NoIdentity";

const { ccclass, property } = _decorator;

@ccclass("IdentityObject")
export class IdentityObject extends GameObject<Identity> {
  get data() {
    return this._data;
  }

  set data(data: Identity) {
    super.setData(data);
    this.refresh();
  }

  refresh() {
    const identityColor = this.node.getChildByPath("Mask/IdentityColor").getComponent(Sprite);
    const identityLabel = this.node.getChildByPath("Mask/Label").getComponent(Label);
    if (!this.data) {
      identityColor.color = color("#646464");
      identityLabel.string = "?";
      identityLabel.fontSize = 28;
      identityLabel.lineHeight = 22;
    } else {
      if (this.data instanceof NoIdentity) {
        identityColor.color = color("#FFFFFF");
        identityLabel.string = "";
      } else {
        if (this.data.inverted) {
          this.node.getChildByPath("Mask/Inverted").active = true;
        } else {
          this.node.getChildByPath("Mask/Inverted").active = false;
        }
        identityColor.color = color(this.data.color);
        identityLabel.string = this.data.name[0];
        identityLabel.fontSize = 18;
        identityLabel.lineHeight = 20;
      }
    }
  }
}
