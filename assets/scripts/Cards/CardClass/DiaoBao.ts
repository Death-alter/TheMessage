import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../types";

export default class DiaoBao extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      spirit: "images/cards/DiaoBao.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
