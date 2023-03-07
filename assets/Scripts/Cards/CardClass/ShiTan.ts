import { Card } from "../Card";
import { ShiTanOption } from "../types";
import { card_type, color } from "../../../Protobuf/proto.d";

export default class ShiTan extends Card {
  private _drawCardColor: color[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: card_type.Shi_Tan,
      spirit: "images/cards/ShiTan.jpg",
      direction: option.direction,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onPlay() {
    super.onPlay();
  }
}
