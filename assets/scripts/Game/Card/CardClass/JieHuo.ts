import { CardInProcess } from "../../../Event/ProcessEventType";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";

export class JieHuo extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      sprite: "images/cards/JieHuo",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onPlay() {
    super.onPlay();
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardInProcess) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
