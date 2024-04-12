import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";
import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { GamePhase } from "../../../Manager/type";
import { GameManager } from "../../../Manager/GameManager";
import { GameLog } from "../../GameLog/GameLog";
import { CardEntity } from "../CardEntity";

export class DiaoBao extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];
  public messageToReplaced: Card = null;

  get description() {
    return "争夺阶段，弃置待收情报，然后用此牌面朝下代替之。";
  }

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "调包",
      type: CardType.DIAO_BAO,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      entity: option.entity,
    });
  }

  canPlay(gui: GameManager) {
    return gui.data.messageInTransmit !== null;
  }

  onPlay(gui: GameManager): void {
    NetworkEventCenter.emit(NetworkEventToS.USE_DIAO_BAO_TOS, {
      cardId: this.id,
      seq: gui.seq,
    });
  }

  onEffect(gameData: GameData, { cardId, oldMessageCard }: CardOnEffectParams) {
    let oldMessage: Card;
    if (cardId !== 0 && gameData.messageInTransmit.id === oldMessageCard.cardId) {
      oldMessage = gameData.messageInTransmit;
    } else {
      oldMessage = gameData.createMessage(oldMessageCard);
    }

    this.messageToReplaced = oldMessage;

    const gameLog = gameData.gameLog;
    gameLog.addData(new GameLog(`情报${gameLog.formatCard(this.messageToReplaced)}被调包`));
  }

  onFinish(gui: GameManager) {
    UIEventCenter.on(
      UIEvent.PLAY_CARD_ANIMATION_FINISH,
      (entity: CardEntity) => {
        if (entity.data === this) {
          GameEventCenter.emit(GameEvent.MESSAGE_REPLACED, {
            message: this,
            oldMessage: this.messageToReplaced,
            messagePlayer: gui.data.playerList[gui.data.messagePlayerId],
            status: CardStatus.FACE_DOWN,
          });
          gui.data.messageInTransmit = this;
          this.messageToReplaced = null;
          UIEventCenter.targetOff(this);
        }
      },
      this,
    );

    return false;
  }

  copy() {
    return new DiaoBao({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
    });
  }
}
