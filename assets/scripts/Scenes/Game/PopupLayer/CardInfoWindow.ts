import { _decorator, Component, RichText, Sprite, color, Label } from "cc";
import { Card } from "../../../Components/Card/Card";
import { Identity } from "../../../Components/Identity/Identity";
import { MiLing } from "../../../Components/Card/CardClass/MiLing";
import { ShiTan } from "../../../Components/Card/CardClass/ShiTan";
import { CardColor, CardDirection, CardType } from "../../../Components/Card/type";
const { ccclass, property } = _decorator;

@ccclass("CardInfoWindow")
export class CardInfoWindow extends Component {
  private _card: Card = null;

  get card() {
    return this._card;
  }

  set card(card: Card) {
    this._card = card;
    this.refresh();
  }

  show() {
    this.node.active = true;
  }

  hide() {
    this.node.active = false;
  }

  refresh() {
    const detail = this.node.getChildByName("Detail").getComponent(RichText);
    const other = this.node.getChildByName("Other");
    other.active = false;

    //名称
    let str;
    str = `${this.card.name}<br/>`;

    //颜色
    if (this.card.color) {
      for (let color of this.card.color) {
        switch (color) {
          case CardColor.BLACK:
            str += `<color=#FFFFFF>黑</color>`;
            break;
          case CardColor.BLUE:
            str += `<color=${Card.colors[color]}>蓝</color>`;
            break;
          case CardColor.RED:
            str += `<color=${Card.colors[color]}>红</color>`;
            break;
        }
      }
    } else {
      str += "未知";
    }
    str += "<br/>";

    //方向
    switch (this.card.direction) {
      case CardDirection.LEFT:
        str += "左";
        break;
      case CardDirection.RIGHT:
        str += "右";
        break;
      case CardDirection.UP:
        str += "上";
        break;
      default:
        str += "未知";
    }
    str += "<br/>";

    //锁定
    if (this.card.lockable == null) {
      str += "未知";
    } else {
      if (this.card.lockable) {
        str += "可锁定";
      } else {
        str += "无";
      }
    }

    str += "<br/>";

    this.node.getChildByName("RichText").getComponent(RichText).string = str;
    detail.string = this.card.description;

    //其他
    if (this.card instanceof MiLing && this.card.secretColor) {
      const arr = ["东", "西", "静"];
      for (let i = 0; i < (<MiLing>this.card).secretColor.length; i++) {
        const secretColor = (<MiLing>this.card).secretColor[i];
        const label = other.children[i].getComponentInChildren(Label);
        const c = color(Card.colors[secretColor]);
        other.children[i].getComponent(Sprite).color = c;
        label.string = arr[i];
      }
      other.active = true;
    }

    if (this.card instanceof ShiTan && this.card.drawCardColor) {
      for (let i = 0; i < 3; i++) {
        other.children[i].getComponent(Sprite).color = color(Identity.colors[i]);
        if ((<ShiTan>this.card).drawCardColor.indexOf(i) === -1) {
          other.children[i].getComponentInChildren(Label).string = "-1";
        } else {
          other.children[i].getComponentInChildren(Label).string = "+1";
        }
      }
      other.active = true;
    }
  }
}
