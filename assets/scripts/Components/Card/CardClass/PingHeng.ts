import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardType } from "../type";
import { GamePhase } from "../../../Manager/type";
import { NetworkEventToS } from "../../../Event/type";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { GameManager } from "../../../Manager/GameManager";
import { PlayerAction } from "../../../Utils/PlayerAction/PlayerAction";
import { PlayerActionStepName } from "../../../Utils/PlayerAction/type";

export class PingHeng extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  get description() {
    return "出牌阶段，你和另一名角色弃置所有手牌，然后由你开始，双方各摸三张牌。";
  }

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onPlay(gui: GameManager): void {
    PlayerAction.switchToGroup("PlayCard")
      .addStep({
        step: PlayerActionStepName.SELECT_PLAYERS,
        data: {
          tooltipText: "请选择平衡的目标",
          num: 1,
          filter: (player) => {
            return player.id !== 0;
          },
          enabled: () => gui.selectedPlayers.list.length > 0,
        },
      })
      .onComplete((data) => {
        NetworkEventCenter.emit(NetworkEventToS.USE_PING_HENG_TOS, {
          cardId: this.id,
          playerId: data[0].players[0].id,
          seq: gui.seq,
        });
      });
  }

  onEffect(): void {}

  copy() {
    return new PingHeng({
      id: this.id,
      direction: this.direction,
      color: this.color?.slice(),
      lockable: this.lockable,
      status: this.status,
    });
  }
}
