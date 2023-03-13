import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor } from "../type";

export class ShiTan extends Card {
  private _drawCardColor: CardColor[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      sprite: "images/cards/ShiTan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      UI: option.UI,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onPlay() {
    super.onPlay();
  }
}
