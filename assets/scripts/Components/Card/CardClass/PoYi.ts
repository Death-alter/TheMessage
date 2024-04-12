import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GameData } from "../../../Manager/GameData";
import { Card } from "../../../Components/Card/Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardStatus, CardType } from "../type";
import { GamePhase } from "../../../Manager/type";
import { GameManager } from "../../../Manager/GameManager";
import { CardOnEffect } from "../../../Event/GameEventType";
import { GameLog } from "../../GameLog/GameLog";

export class PoYi extends Card {
  public readonly availablePhases = [GamePhase.SEND_PHASE];

  get description() {
    return "传递阶段，查看传递到你面前的情报，若该情报是黑色，你可以将其翻开，然后摸一张牌。";
  }

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "破译",
      type: CardType.PO_YI,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      entity: option.entity,
    });
  }

  canPlay(gui: GameManager) {
    return gui.data.messagePlayerId === 0;
  }

  onPlay(gui: GameManager): void {
    NetworkEventCenter.emit(NetworkEventToS.USE_PO_YI_TOS, {
      cardId: this.id,
      seq: gui.seq,
    });
  }

  onEffect(gameData: GameData, { userId, targetCard }: CardOnEffectParams): void {
    const player = gameData.playerList[userId];
    const gamelog = gameData.gameLog;
    if (userId === 0) {
      const message = gameData.createMessage(targetCard);
      gameData.messageInTransmit = message;

      GameEventCenter.emit(GameEvent.PLAYER_VIEW_MESSAGE, { player, message });

      const isBlackMessage = Card.hasColor(message, CardColor.BLACK);
      gamelog.addData(new GameLog(`传递中的情报是${gamelog.formatCard(message)}`));
      GameEventCenter.emit(GameEvent.CARD_ON_EFFECT, {
        card: this,
        handler: "promptChooseDraw",
        params: {
          isBlackMessage,
        },
      } as CardOnEffect);
    }
  }

  promptChooseDraw(gui: GameManager, params) {
    const { isBlackMessage } = params;
    const tooltip = gui.tooltip;
    tooltip.setText(`是否翻开并摸一张牌？`);
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.PO_YI_SHOW_TOS, {
            show: true,
            seq: gui.seq,
          });
        },
        enabled: isBlackMessage,
      },
      {
        text: "取消",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.PO_YI_SHOW_TOS, {
            show: false,
            seq: gui.seq,
          });
        },
      },
    ]);
  }

  onShow(gameData: GameData, { userId, targetCard, flag }: CardOnEffectParams) {
    if (flag) {
      const gamelog = gameData.gameLog;
      const player = gameData.playerList[userId];
      if (userId !== 0) {
        const message = gameData.createMessage(targetCard);
        gameData.messageInTransmit = message;
      }
      gameData.messageInTransmit.status = CardStatus.FACE_UP;
      GameEventCenter.emit(GameEvent.MESSAGE_TURNED_OVER, { message: gameData.messageInTransmit });
      gamelog.addData(new GameLog(`${gamelog.formatPlayer(player)}翻开待收情报`));
    }
  }

  copy() {
    return new PoYi({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
    });
  }
}
