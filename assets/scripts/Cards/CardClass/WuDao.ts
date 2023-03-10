import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class WuDao extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "误导",
      type: CardType.WU_DAO,
      sprite: "images/cards/WuDao.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
