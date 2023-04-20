import { createCard } from "../index";
import { GameEventCenter } from "../../../Event/EventTarget";
import { CardInProcess } from "../../../Event/ProcessEventType";
import { GameEvent } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardDirection, CardType, CardUsage } from "../type";

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

  onEffect(gameData: GameData, { targetPlayerId, targetCard, flag }: CardInProcess): void {
    if (!targetCard) return;
    const targetPlayer = gameData.playerList[targetPlayerId];
    if (flag) {
      const card = createCard({
        id: targetCard.cardId,
        color: (<number[]>targetCard.cardColor) as CardColor[],
        type: (<number>targetCard.cardType) as CardType,
        direction: (<number>targetCard.cardDir) as CardDirection,
        drawCardColor: (<number[]>targetCard.whoDrawCard) as CardColor[],
        usage: CardUsage.HAND_CARD,
        lockable: targetCard.canLock,
      });
      targetPlayer.addHandCard(card);
      GameEventCenter.emit(GameEvent.CARD_ADD_TO_HAND_CARD, {
        player: targetPlayer,
        message: targetCard,
      });
    } else {
      const card = createCard({
        id: targetCard.cardId,
        color: (<number[]>targetCard.cardColor) as CardColor[],
        type: (<number>targetCard.cardType) as CardType,
        direction: (<number>targetCard.cardDir) as CardDirection,
        drawCardColor: (<number[]>targetCard.whoDrawCard) as CardColor[],
        usage: CardUsage.MESSAGE_CARD,
        lockable: targetCard.canLock,
      });
      targetPlayer.addMessage(card);
      GameEventCenter.emit(GameEvent.MESSAGE_PLACED_INTO_MESSAGE_ZONE, {
        player: targetPlayer,
        message: targetCard,
      });
    }
  }
}
