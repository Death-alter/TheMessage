import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
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
    const tooltip = gui.tooltip;
    const showCardsWindow = gui.showCardsWindow;
    tooltip.setText(`请选择要澄清的目标`);
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => {
        return player.messageCounts[CardColor.BLACK] !== 0;
      },
      onSelect: async (player: Player) => {
        showCardsWindow.show({
          title: "选择一张情报弃置",
          cardList: player.getMessagesCopy(),
          limit: 1,
          buttons: [
            {
              text: "确定",
              onclick: () => {
                NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, {
                  cardId: this.id,
                  playerId: gui.gameLayer.selectedPlayers.list[0].id,
                  targetCardId: showCardsWindow.selectedCards.list[0].id,
                  seq: gui.seq,
                });
                showCardsWindow.hide();
                this.onDeselected(gui);
              },
              enabled: () => !!showCardsWindow.selectedCards.list.length,
            },
            {
              text: "取消",
              onclick: () => {
                showCardsWindow.hide();
                gui.gameLayer.stopSelectPlayers();
              },
            },
          ],
        });
      },
    });
  }

  onDeselected(gui: GameManager) {
    gui.gameLayer.stopSelectPlayers();
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
