import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { ShiTanOption, CardType, CardColor, CardOnEffectParams, CardStatus } from "../type";

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

  onEffect(gameData: GameData, params: CardOnEffectParams) {}

  onShow(gameData: GameData, { user, targetPlayer, card }: CardOnEffectParams) {
    card = <Card>card;
    //自己是被试探的目标时展示那张试探牌
    if (targetPlayer.id === 0) {
      card.gameObject = gameData.cardOnPlay.gameObject;
      card.status = CardStatus.FACE_DOWN;
      gameData.cardOnPlay = card;
      card.flip();
    }
  }
}
