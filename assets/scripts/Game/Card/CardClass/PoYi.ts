import { createCard } from "../index";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { CardInProcess } from "../../../Event/ProcessEventType";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardDirection, CardStatus, CardType, CardUsage } from "../type";

export class PoYi extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: CardType.PO_YI,
      sprite: "images/cards/PoYi",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay() {}

  onPlay(seq: number) {
    super.onPlay();
    NetworkEventCenter.emit(NetworkEventToS.USE_PO_YI_TOS, {
      cardId: this.id,
      seq,
    });
  }

  onEffect(gameData: GameData, { targetCard }: CardInProcess): void {
    if (targetCard) {
      const card = createCard({
        id: targetCard.cardId,
        color: (<number[]>targetCard.cardColor) as CardColor[],
        type: (<number>targetCard.cardType) as CardType,
        direction: (<number>targetCard.cardDir) as CardDirection,
        drawCardColor: (<number[]>targetCard.whoDrawCard) as CardColor[],
        usage: CardUsage.HAND_CARD,
        status: CardStatus.FACE_DOWN,
        lockable: targetCard.canLock,
      });
      card.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = card;
      targetCard.flip();
    }
  }

  onShow(gameData: GameData, { user, targetCard, flag }: CardInProcess) {
    if (flag && user.id !== 0) {
      targetCard.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = targetCard;
      targetCard.flip();
    }
  }
}
