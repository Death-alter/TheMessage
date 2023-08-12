import { Card } from "../Card";
import { CardDefaultOption, CardStatus, CardType } from "../type";

export class UnknownCard extends Card {
  public readonly availablePhases = [];

  constructor(option: CardDefaultOption) {
    super({
      id: 0,
      name: "未知卡牌",
      type: CardType.UNKNOWN,
      direction: null,
      color: [],
      lockable: false,
      status: CardStatus.FACE_DOWN,
      gameObject: option.gameObject,
    });
  }
}
