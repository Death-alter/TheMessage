import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto.d";

export default class PoYi extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: card_type.Po_Yi,
      spirit: "images/cards/PoYi.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
