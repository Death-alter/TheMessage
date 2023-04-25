import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class PingHeng extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      sprite: "images/cards/PingHeng",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onPlay() {
    super.onPlay();
  }

  onEffect(): void {}
}
