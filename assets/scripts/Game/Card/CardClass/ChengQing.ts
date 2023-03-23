import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class ChengQing extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: CardType.CHENG_QING,
      sprite: "images/cards/ChengQing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay(gameData: GameData) {

  }

  onEffect(gameData: GameData, { targetPlayer, targetCardId }: CardOnEffectParams) {
    targetPlayer.removeMessage(targetCardId);
  }
}
