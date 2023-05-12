import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

export class PoYi extends Card {
  public readonly availablePhases = [GamePhase.SEND_PHASE];

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
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {}
  
  onDeselected() {
  }

  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }


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
