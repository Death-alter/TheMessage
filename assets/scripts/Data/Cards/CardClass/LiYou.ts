import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class LiYou extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      sprite: "images/cards/LiYou",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
