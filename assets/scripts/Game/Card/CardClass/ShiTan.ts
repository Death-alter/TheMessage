import { createCard } from "../index";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { CardInProcess } from "../../../Event/ProcessEventType";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor, CardOnEffectParams, CardStatus, CardDirection, CardUsage } from "../type";

export class ShiTan extends Card {
  private _drawCardColor: CardColor[];

  get drawCardColor() {
    return this._drawCardColor;
  }

  constructor(option: ShiTanOption) {
    super({
      id: option.id,
      name: "试探",
      type: CardType.SHI_TAN,
      sprite: "images/cards/ShiTan",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      usage: option.usage,
      gameObject: option.gameObject,
    });
    this._drawCardColor = option.drawCardColor;
  }

  onConfirmPlay(): void {}

  onPlay({ playerId, seq }: { playerId: number; seq: number }) {
    super.onPlay();
    NetworkEventCenter.emit(NetworkEventToS.USE_SHI_TAN_TOS, {
      cardId: this.id,
      playerId,
      seq,
    });
  }

  onEffect(gameData: GameData, { userId, flag }: CardInProcess) {}

  onShow(gameData: GameData, { userId, targetPlayerId, card }: CardInProcess) {
    //自己是被试探的目标时展示那张试探牌
    if (targetPlayerId === 0) {
      const shiTanCard = createCard({
        id: card.cardId,
        color: (<number[]>card.cardColor) as CardColor[],
        type: (<number>card.cardType) as CardType,
        direction: (<number>card.cardDir) as CardDirection,
        drawCardColor: (<number[]>card.whoDrawCard) as CardColor[],
        usage: CardUsage.MESSAGE_CARD,
        status: CardStatus.FACE_DOWN,
        lockable: card.canLock,
      });
      shiTanCard.gameObject = gameData.cardOnPlay.gameObject;
      gameData.cardOnPlay = card;
      card.flip();
    }
  }
}
