import { Card } from "../Card";
import { CardDefaultOption, CardStatus, CardType } from "../type";

export class UnknownCard extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: 0,
      name: "未知卡牌",
      type: CardType.UNKNOWN,
      sprite: "images/cards/CardBack",
      direction: null,
      color: [],
      lockable: false,
      status: CardStatus.FACE_DOWN,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onEffect() {}
}
