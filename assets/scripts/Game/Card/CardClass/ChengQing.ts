import { GameEventCenter, NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Player } from "../../Player/Player";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class ChengQing extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "澄清",
      type: CardType.CHENG_QING,
      sprite: "images/cards/ChengQing",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.selectedPlayers.limit = 1;
    tooltip.setText(`请选择要澄清的目标`);
    ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, (player: Player) => {
      gameData.gameObject.showCardsWindow.show({
        title: "选择一张情报弃置",
        cardList: player.getMessagesCopy(),
        limit: 1,
        buttons: [
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, {
                cardId: gameData.gameObject.handCardList.selectedCards.list[0].id,
                playerId: gameData.gameObject.selectedPlayers.list[0],
                targetCardId: gameData.gameObject.showCardsWindow.selectedCards.list[0].id,
                seq: gameData.gameObject.seq,
              });
              gameData.gameObject.resetSelectPlayer();
              gameData.gameObject.selectedPlayers.limit = 0;
              gameData.gameObject.showCardsWindow.hide();
              ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
            },
          },
          {
            text: "取消",
            onclick: () => {
              gameData.gameObject.showCardsWindow.hide();
              gameData.gameObject.resetSelectPlayer();
            },
          },
        ],
      });
    });
  }

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.selectedPlayers.limit = 0;
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { targetPlayerId, targetCardId }: CardOnEffectParams) {
    const targetPlayer = gameData.playerList[targetPlayerId];
    const message = targetPlayer.removeMessage(targetCardId)[0];
    GameEventCenter.emit(GameEvent.PLAYER_REOMVE_MESSAGE, {
      player: targetPlayer,
      messageList: [message],
    });
  }
}
