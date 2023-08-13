import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction";

export class ChengQing extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE, GamePhase.RECEIVE_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: CardType.CHENG_QING,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameManager) {
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;

    gui.uiLayer.playerActionManager.switchTo(
      new PlayerAction({
        actions: [
          {
            name: "selectPlayer",
            handler: () =>
              new Promise((resolve, reject) => {
                tooltip.setText(`请选择要澄清的目标`);
                gui.gameLayer.startSelectPlayers({
                  num: 1,
                  onSelect: (player) => {
                    resolve({ player });
                  },
                });
              }),
          },
          {
            name: "selectCard",
            handler: ({ player }) =>
              new Promise((resolve, reject) => {
                showCardsWindow.show({
                  title: "选择一张黑色情报弃置",
                  cardList: player.getMessagesCopy(),
                  limit: 1,
                  buttons: [
                    {
                      text: "确定",
                      onclick: () => {
                        resolve({
                          playerId: player.id,
                          targetCardId: showCardsWindow.selectedCards.list[0].id,
                        });
                        showCardsWindow.hide();
                      },
                      enabled: () =>
                        !!showCardsWindow.selectedCards.list.length &&
                        Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
                    },
                    {
                      text: "取消",
                      onclick: () => {
                        showCardsWindow.hide();
                        gui.gameLayer.stopSelectPlayers();
                        reject();
                      },
                    },
                  ],
                });
              }),
          },
        ],
        complete: (data) => {
          NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, {
            cardId: this.id,
            playerId: data.playerId,
            targetCardId: data.targetCardId,
            seq: gui.seq,
          });
        },
      })
    );
  }

  onDeselected(gui: GameManager) {
    gui.showCardsWindow.hide();
    gui.uiLayer.playerActionManager.switchToDefault();
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
