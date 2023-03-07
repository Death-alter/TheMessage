import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto";

export default class DiaoBao extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: card_type.Diao_Bao,
      spirit: "images/cards/DiaoBao.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
