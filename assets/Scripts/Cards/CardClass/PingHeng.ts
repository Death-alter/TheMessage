import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto";

export default class PingHeng extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: card_type.Ping_Heng,
      spirit: "images/cards/PingHeng.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
