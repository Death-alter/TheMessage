import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";

export class DiaoBao extends Card {
  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      sprite: "images/cards/DiaoBao",
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
    // NetworkEventCenter.emit(NetworkEventToS.USE_DIAO_BAO_TOS, { cardId: this.id });
  }

  onEffect(gameData: GameData, { cardId, targetCard }: CardOnEffectParams) {
    const oldMessage = gameData.messageInTransmit;
    if (cardId) {
      gameData.messageInTransmit = gameData.cardOnPlay;
      gameData.messageInTransmit.flip();
    } else {
      gameData.messageInTransmit = gameData.createMessage();
      gameData.messageInTransmit.gameObject = gameData.cardOnPlay.gameObject;
    }

    GameEventCenter.emit(GameEvent.MESSAGE_REPLACED, {
      message: gameData.messageInTransmit,
      oldMessage,
    });

    return true;
  }
}
