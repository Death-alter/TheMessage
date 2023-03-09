import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor } from "../type";

export default class ShiTan extends Card {
  private _drawCardColor: CardColor[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      spirit: "images/cards/ShiTan.jpg",
      direction: option.direction,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onPlay() {
    super.onPlay();
  }
}
