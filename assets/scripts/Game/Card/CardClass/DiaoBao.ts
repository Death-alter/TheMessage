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
      gameObject: option.gameObject,
    });
  }

  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }


  onPlay() {
    super.onPlay();
    // NetworkEventCenter.emit(NetworkEventToS.USE_DIAO_BAO_TOS, { cardId: this.id });
  }

  onEffect(gameData: GameData, { cardId, oldMessageCard }: CardOnEffectParams) {
    let oldMessage;
    if (cardId !== 0 && gameData.messageInTransmit.id === cardId) {
      oldMessage = gameData.messageInTransmit;
    } else {
      oldMessage = gameData.createMessage(oldMessageCard);
      oldMessage.gameObject = gameData.messageInTransmit.gameObject;
    }

    gameData.messageInTransmit = gameData.cardOnPlay;

    GameEventCenter.emit(GameEvent.MESSAGE_REPLACED, {
      message: gameData.messageInTransmit,
      oldMessage,
    });

    return true;
  }
}
