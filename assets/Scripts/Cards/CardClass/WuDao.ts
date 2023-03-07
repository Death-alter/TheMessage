import { Card } from "../Card";
import { CardClassDefaultOption } from "../types";
import { card_type } from "../../../Protobuf/proto";

export default class WuDao extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "误导",
      type: card_type.Wu_Dao,
      spirit: "images/cards/WuDao.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
