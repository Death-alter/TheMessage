import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class JieHuo extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      sprite: "images/cards/JieHuo",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
