import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class PoYi extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: CardType.PO_YI,
      sprite: "images/cards/PoYi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      UI: option.UI,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
