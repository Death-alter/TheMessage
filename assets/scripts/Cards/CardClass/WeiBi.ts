import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class WeiBi extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      sprite: "images/cards/WeiBi.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
