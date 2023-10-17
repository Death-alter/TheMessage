import { GameData } from "../../../Manager/GameData";
import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../Manager/type";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { NetworkEventToS } from "../../../Event/type";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class WuDao extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "误导",
      type: CardType.WU_DAO,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
    });
  }

  onPlay(gui: GameManager): void {
    const neighbors = gui.data.getPlayerNeighbors(gui.data.messagePlayerId);
    PlayerAction.switchToGroup("PlayCard").addStep({
      step: PlayerActionStepName.SELECT_PLAYERS,
      data: {
        tooltipText: "请选择误导的目标",
        num: 1,
        filter: (player) => {
          return neighbors.indexOf(player) !== -1;
        },
        enabled: () => gui.selectedPlayers.list.length > 0,
      },
    }).onComplete((data) => {
      NetworkEventCenter.emit(NetworkEventToS.USE_WU_DAO_TOS, {
        cardId: this.id,
        targetPlayerId: data[0].players[0].id,
        seq: gui.seq,
      });
    });
  }

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
