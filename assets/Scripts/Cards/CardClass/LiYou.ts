import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto.d";

export default class LiYou extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: card_type.Li_You,
      spirit: "images/cards/LiYou.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
