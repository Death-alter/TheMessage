import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
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

  onPlay() {
  }

  onEffect(gameData: GameData, { userId, flag }: CardOnEffectParams) {}

  onShow(gameData: GameData, { userId, targetPlayerId, card }: CardOnEffectParams) {
    //自己是被试探的目标时展示那张试探牌
    if (targetPlayerId === 0) {
      const shiTanCard = gameData.createFunctionCard(card);
      shiTanCard.gameObject = gameData.cardOnPlay.gameObject;
      gameData.cardOnPlay = shiTanCard;
      shiTanCard.flip();
    }
  }
}
