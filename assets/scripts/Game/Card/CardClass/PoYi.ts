import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

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
    // NetworkEventCenter.emit(NetworkEventToS.USE_PO_YI_TOS, {
    //   cardId: this.id,
    //   seq,
    // });
  }

  onEffect(gameData: GameData, { userId, targetCard }: CardOnEffectParams): void {
    if (userId === 0) {
      const message = gameData.createMessage(targetCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();
    }
  }

  onShow(gameData: GameData, { userId, targetCard, flag }: CardOnEffectParams) {
    if (flag && userId !== 0) {
      const message = gameData.createMessage(targetCard);
      message.gameObject = gameData.messageInTransmit.gameObject;
      gameData.messageInTransmit = message;
      message.flip();
    }
  }
}
