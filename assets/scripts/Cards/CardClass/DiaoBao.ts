import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class DiaoBao extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      sprite: "images/cards/DiaoBao.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
