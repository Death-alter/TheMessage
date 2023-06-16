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
    tooltip.setText(`请选择误导的目标`);
    const neighbors = gameData.getPlayerNeighbors(gameData.messagePlayerId);
    gameData.gameObject.startSelectPlayer({
      num: 1,
      filter: (player) => {
        return neighbors.indexOf(player) !== -1;
      },
      onSelect: (player) => {
        tooltip.setText(`是否使用误导？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              NetworkEventCenter.emit(NetworkEventToS.USE_WU_DAO_TOS, {
                cardId: this.id,
                targetPlayerId: player.id,
                seq: gameData.gameObject.seq,
              });
              this.onDeselected(gameData);
            },
          },
        ]);
      },
    });
  }

  onDeselected(gameData: GameData) {
    gameData.gameObject.stopSelectPlayer();
    gameData.gameObject.clearSelectedPlayers();
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
