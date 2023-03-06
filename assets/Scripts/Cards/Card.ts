import { _decorator, Component, Node } from "cc";
import { direction } from "../../Protobuf/proto";
import { CardStatus, CardUseage } from "./types";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class Card extends Component {
  public status: CardStatus;
  public useage: CardUseage;
  public direction: direction;

  //当做功能牌打出
  onPlay() {
    this.useage = CardUseage.FUNCTION_CARD;
  }

  //当做情报传递
  onSend() {
    this.useage = CardUseage.MESSAGE_CARD;
  }

  //翻面
  flip() {
    if (this.status === CardStatus.FACE_UP) {
      this.status = CardStatus.FACE_DOWN;
    } else {
      this.status = CardStatus.FACE_UP;
    }
  }
}
