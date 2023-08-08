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

    //其他 和 技能描述
    switch (this.card.type) {
      case CardType.CHENG_QING:
        detail.string =
          "♦ 出牌阶段，从一名角色的情报区弃置一张黑色情报。<br/>♦ 某名角色濒死时，从该角色的情报区弃置一张黑色情报。";
        break;
      case CardType.DIAO_BAO:
        detail.string = "争夺阶段，弃置待收情报，然后用此牌面朝下代替之。";
        break;
      case CardType.FENG_YUN_BIAN_HUAN:
        detail.string =
          "出牌阶段，你从牌堆顶翻出等同于存活角色数量的牌，从你开始，逆时针顺序，每名角色选择其中一张加入手牌，若其情报区中没有与所选牌同色的情报，则其可以改为将所选牌置入自己的情报区。";
        break;
      case CardType.JIE_HUO:
        detail.string = "争夺阶段，将待收情报移至你的面前。";
        break;
      case CardType.LI_YOU:
        detail.string =
          "出牌阶段，指定一名角色，然后翻开牌堆顶的一张牌并置入其情报区，若如此做会让其收集三张或更多同色情报，则改为将翻开的牌加入你的手牌。";
        break;
      case CardType.MI_LING:
        str = "传递阶段，指定一名角色代替你传出情报，你将这张牌面朝下递给该角色，并说出以下一个暗号,";
        if ((<MiLing>this.card).secretColor) {
          const arr = ["东", "西", "静"];
          for (let i = 0; i < (<MiLing>this.card).secretColor.length; i++) {
            const secretColor = (<MiLing>this.card).secretColor[i];
            const label = other.children[i].getComponentInChildren(Label);
            const c = color(Card.colors[secretColor]);
            other.children[i].getComponent(Sprite).color = c;
            label.string = arr[i];
            str += `<color=${Card.colors[secretColor]}>${arr[i]}风</color>`;
            if (i === 2) {
              str += "，";
            } else {
              str += "、";
            }
          }
          other.active = true;
        } else {
          str += "东风、西风、静风，";
        }
        str += "其必须传出暗号对应颜色的情报。若其没有对应颜色的手牌，则让你查看其手牌，你选择一张由其传出。";
        detail.string = str;
        break;
      case CardType.PING_HENG:
        detail.string = "出牌阶段，你和另一名角色弃置所有手牌，然后由你开始，双方各摸三张牌。";
        break;
      case CardType.PO_YI:
        detail.string = "传递阶段，查看传递到你面前的情报，若该情报是黑色，你可以将其翻开，然后摸一张牌。";
        break;
      case CardType.SHI_TAN:
        str = "出牌阶段，将这张牌面朝下递给另一名角色，其必须根据自己的身份牌如实执行：<br/>";
        if ((<ShiTan>this.card).drawCardColor) {
          const array = ["神秘人", "潜伏战线", "特工机关"];
          let drawStr = "";
          let disCardStr = "";
          for (let i = 0; i < 3; i++) {
            other.children[i].getComponent(Sprite).color = color(Identity.colors[i]);
            if ((<ShiTan>this.card).drawCardColor.indexOf(i) === -1) {
              if (disCardStr.length) {
                disCardStr += "或";
              }
              disCardStr += `<color=${Identity.colors[i]}>${array[i]}</color>`;
              other.children[i].getComponentInChildren(Label).string = "-1";
            } else {
              if (drawStr.length) {
                drawStr += "或";
              }
              drawStr += `<color=${Identity.colors[i]}>${array[i]}</color>`;
              other.children[i].getComponentInChildren(Label).string = "+1";
            }
          }

          disCardStr += "：弃置一张手牌。<br/>";
          drawStr += "：摸一张牌。";
          str += disCardStr + drawStr;
          other.active = true;
        }
        detail.string = str;
        break;
      case CardType.WEI_BI:
        detail.string =
          "出牌阶段，指定一名角色，并宣言以下一种卡牌名称：【截获】【误导】【调包】【澄清】。该角色必须从手牌中将一张被宣言的卡牌交给你。若其手牌中没有，则必须让你查看全部手牌。";
        break;
      case CardType.WU_DAO:
        detail.string = "争夺阶段，将待收情报由当前角色面前移至其相邻角色的面前。";
        break;
      default:
        detail.string = "";
    }
  }
}
