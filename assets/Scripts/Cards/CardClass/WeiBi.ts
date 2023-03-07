import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto";

export default class WeiBi extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "威逼",
      type: card_type.Wei_Bi,
      spirit: "images/cards/WeiBi.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
