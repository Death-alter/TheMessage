import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class PoYi extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: CardType.PO_YI,
      spirit: "images/cards/PoYi.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
