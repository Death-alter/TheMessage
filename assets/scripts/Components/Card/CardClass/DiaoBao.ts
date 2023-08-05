import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GamePhase } from "../../../Manager/type";
import { GameManager } from "../../../Manager/GameManager";
import { GameLog } from "../../GameLog/GameLog";

export class DiaoBao extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];
  public messageToReplaced: Card = null;

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      src: "DiaoBao",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameManager): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`是否使用调包？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.USE_DIAO_BAO_TOS, {
            cardId: this.id,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onEffect(gameData: GameData, { cardId, oldMessageCard }: CardOnEffectParams) {
    let oldMessage: Card;
    if (cardId !== 0 && gameData.messageInTransmit.id === oldMessageCard.cardId) {
      oldMessage = gameData.messageInTransmit;
    } else {
      oldMessage = gameData.createMessage(oldMessageCard);
      oldMessage.gameObject = gameData.messageInTransmit.gameObject;
    }

    gameData.messageInTransmit = gameData.cardOnPlay;
    this.messageToReplaced = oldMessage;

    const gameLog = gameData.gameLog;
    gameLog.addData(new GameLog(`情报${gameLog.formatCard(this.messageToReplaced)}被调包`));
  }

  onFinish(gui: GameManager) {
    GameEventCenter.emit(GameEvent.MESSAGE_REPLACED, {
      message: gui.data.messageInTransmit,
      oldMessage: this.messageToReplaced,
    });

    this.messageToReplaced = null;
    return false;
  }
}
