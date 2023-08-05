import { GameEventCenter, NetworkEventCenter, UIEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, UIEvent } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Player } from "../../Player/Player";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GameManager } from "../../../Manager/GameManager";

export class ChengQing extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: CardType.CHENG_QING,
      src: "ChengQing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameManager) {
    const tooltip = gui.uiLayer.tooltip;
    tooltip.setText(`请选择要澄清的目标`);
    UIEventCenter.emit(UIEvent.START_SELECT_PLAYER, {
      num: 1,
      filter: (player) => {
        return player.messageCounts[CardColor.BLACK] !== 0;
      },
      onSelect: async (player: Player) => {
        UIEventCenter.emit(UIEvent.START_SHOW_CARDS, {
          title: "选择一张情报弃置",
          cardList: player.getMessagesCopy(),
          limit: 1,
          buttons: [
            {
              text: "确定",
              onclick: (window) => {
                NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, {
                  cardId: this.id,
                  playerId: gui.gameLayer.selectedPlayers.list[0].id,
                  targetCardId: window.selectedCards.list[0].id,
                  seq: gui.seq,
                });
                window.hide();
                this.onDeselected(gui);
              },
              enabled: (window) => !!window.selectedCards.list.length,
            },
            {
              text: "取消",
              onclick: (window) => {
                window.hide();
                UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
              },
            },
          ],
        });
      },
    });
  }

  onDeselected(gui: GameManager) {
    UIEventCenter.emit(UIEvent.CANCEL_SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { targetPlayerId, targetCardId }: CardOnEffectParams) {
    const targetPlayer = gameData.playerList[targetPlayerId];
    const message = targetPlayer.removeMessage(targetCardId);
    const gameLog = gameData.gameLog;

    GameEventCenter.emit(GameEvent.PLAYER_REMOVE_MESSAGE, {
      player: targetPlayer,
      messageList: [message],
    });

    gameLog.addData(new GameLog(`${gameLog.formatPlayer(targetPlayer)}的情报${gameLog.formatCard(message)}被弃置`));
  }
}
