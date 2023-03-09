import { Card } from "../Card";
import { CardClassDefaultOption, CardType } from "../type";

export default class FenYunBianHuan extends Card {
  constructor(option: CardClassDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: CardType.FENG_YUN_BIAN_HUAN,
      spirit: "images/cards/FengYunBianHuan.jpg",
      direction: option.direction,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
