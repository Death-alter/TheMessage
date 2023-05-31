import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { NetworkEventCenter, ProcessEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";

export class WuDao extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "误导",
      type: CardType.WU_DAO,
      sprite: "images/cards/WuDao",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    gameData.gameObject.selectedPlayers.limit = 1;
    console.log(gameData.messagePlayerId)
    const neighbors = gameData.getPlayerNeighbors(gameData.messagePlayerId);
    console.log(neighbors);
    gameData.gameObject.setPlayerSelectable((player) => {
      return neighbors.indexOf(player) !== -1;
    });
    tooltip.setText(`请选择误导的目标`);
    ProcessEventCenter.on(ProcessEvent.SELECT_PLAYER, () => {
      tooltip.setText(`是否使用误导？`);
      tooltip.buttons.setButtons([
        {
          text: "确定",
          onclick: () => {
            const card = gameData.gameObject.handCardList.selectedCards.list[0];
            const player = gameData.gameObject.selectedPlayers.list[0];
            NetworkEventCenter.emit(NetworkEventToS.USE_WU_DAO_TOS, {
              cardId: card.id,
              targetPlayerId: player.id,
              seq: gameData.gameObject.seq,
            });
            this.onDeselected(gameData, tooltip);
          },
        },
      ]);
    });
  }

  onDeselected(gameData: GameData, tooltip: Tooltip) {
    gameData.gameObject.resetSelectPlayer();
    gameData.gameObject.selectedPlayers.limit = 0;
    gameData.gameObject.clearPlayerSelectable();
    ProcessEventCenter.off(ProcessEvent.SELECT_PLAYER);
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }

}
