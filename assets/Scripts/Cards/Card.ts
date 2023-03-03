import { _decorator, Component, Node } from "cc";
import { direction } from "../../Protobuf/proto";
const { ccclass, property } = _decorator;

enum CardStatus {
  FACE_DOWN = 0,
  FACE_UP = 1,
  IN_HAND = 2,
}

enum CardUseage {
  FUNCTION_CARD = 0,
  MESSAGE_CARD = 1,
  HAND_CARD = 2,
}

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
    if (this.status === CardStatus.IN_HAND) {
      return;
    }
    if (this.status === CardStatus.FACE_UP) {
      this.status = CardStatus.FACE_DOWN;
    } else {
      this.status = CardStatus.FACE_UP;
    }
  }
}
