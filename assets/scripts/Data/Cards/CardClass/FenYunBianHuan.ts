import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class FenYunBianHuan extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "风云变幻",
      type: CardType.FENG_YUN_BIAN_HUAN,
      sprite: "images/cards/FengYunBianHuan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      UI: option.UI,
    });
  }

  onPlay() {
    super.onPlay();
  }
}
