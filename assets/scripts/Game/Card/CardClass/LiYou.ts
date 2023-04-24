import { GameEventCenter } from "../../../Event/EventTarget";
import { GameEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class LiYou extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "利诱",
      type: CardType.LI_YOU,
      sprite: "images/cards/LiYou",
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

  onEffect(gameData: GameData, { targetPlayerId, targetCard, flag }: CardOnEffectParams): void {
    if (!targetCard) return;
    const targetPlayer = gameData.playerList[targetPlayerId];
    if (flag) {
      const card = gameData.createHandCard(targetCard);
      targetPlayer.addHandCard(card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: targetPlayer,
        card: card,
      });
    } else {
      const card = gameData.createMessage(targetCard);
      targetPlayer.addMessage(card);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: card,
      });
    }
  }
}
