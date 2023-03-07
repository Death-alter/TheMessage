import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto";

export default class JieHuo extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: card_type.Jie_Huo,
      spirit: "images/cards/JieHuo.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
