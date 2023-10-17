import { GameManager } from "../../../Manager/GameManager";
import { Card } from "../Card";
import { CardStatus, CardType } from "../type";

export class UnknownCard extends Card {
  public readonly availablePhases = [];

  constructor() {
    super({
      id: 0,
      name: "未知卡牌",
      type: CardType.UNKNOWN,
      direction: null,
      color: [],
      lockable: false,
      status: CardStatus.FACE_DOWN,
    });
  }

  canPlay(gui: GameManager) {
    return false;
  }
}
