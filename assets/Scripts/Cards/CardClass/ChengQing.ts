import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto.d";

export default class CengQing extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: card_type.Cheng_Qing,
      spirit: "images/cards/CengQing.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
