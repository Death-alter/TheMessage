import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../types";

export default class PingHeng extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      spirit: "images/cards/PingHeng.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
