import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class JieHuo extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      spirit: "images/cards/JieHuo.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
