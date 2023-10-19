import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { GamePhase } from "../../../Manager/type";
import { GameData } from "../../../Manager/GameData";
import { GameLog } from "../../GameLog/GameLog";
import { Card } from "../Card";
import { CardColor, CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";
import { Player } from "../../Player/Player";

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
    });
  }

  canPlay(gui: GameManager) {
    for (let player of gui.data.playerList) {
      if (player.messageCounts[CardColor.BLACK] > 0) {
        return true;
      }
    }
    return false;
  }

  onPlay(gui: GameManager) {
    const showCardsWindow = gui.showCardsWindow;
    PlayerAction.switchToGroup("PlayCard")
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          num: 1,
          filter: (player: Player) => player.messageCounts[CardColor.BLACK] > 0,
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
        resolver: (data) => {
          return { playerId: data.players[0].id };
        },
      })
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYER_MESSAGE,
        data: {
          title: "请选择一张黑色情报弃置",
          enabled: () =>
            showCardsWindow.selectedCards.list.length > 0 &&
            Card.hasColor(showCardsWindow.selectedCards.list[0], CardColor.BLACK),
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, {
          cardId: this.id,
          playerId: data[1].playerId,
          targetCardId: data[0].cardId,
          seq: gui.seq,
        });
      });
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
