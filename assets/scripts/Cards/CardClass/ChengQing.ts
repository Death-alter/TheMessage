import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class CengQing extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: CardType.CHENG_QING,
      sprite: "images/cards/CengQing.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
