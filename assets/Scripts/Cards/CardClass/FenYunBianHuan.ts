import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto.d";

export default class FenYunBianHuan extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: card_type.Feng_Yun_Bian_Huan,
      spirit: "images/cards/FengYunBianHuan.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
