import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class MiLing extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "密令",
      type: CardType.MI_LING,
      sprite: "images/cards/MiLing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay(gameData: GameData) {}

  onEffect(gameData: GameData, { targetPlayerId, targetCardId }: CardOnEffectParams) {}
}
