import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class LiYou extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      sprite: "images/cards/LiYou.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
