import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class PingHeng extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      sprite: "images/cards/PingHeng.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
