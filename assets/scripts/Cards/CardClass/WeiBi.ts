import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../types";

export default class WeiBi extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: CardType.WEI_BI,
      spirit: "images/cards/WeiBi.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
