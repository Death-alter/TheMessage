import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class WeiBi extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      sprite: "images/cards/WeiBi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
