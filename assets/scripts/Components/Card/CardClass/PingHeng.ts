import { Card } from "../../../Components/Card/Card";
import { CardDefaultOption, CardType } from "../type";
import { GamePhase } from "../../../Manager/type";
import { NetworkEventToS} from "../../../Event/type";
import { NetworkEventCenter } from "../../../Event/EventTarget";
import { GameManager } from "../../../Manager/GameManager";

export class PingHeng extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      src: "PingHeng",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gui: GameManager): void {
    const tooltip = gui.tooltip;
    tooltip.setText(`请选择平衡的目标`);
    gui.gameLayer.startSelectPlayers({
      num: 1,
      filter: (player) => {
        return player.id !== 0;
      },
      onSelect: () => {
        tooltip.setText(`是否使用平衡？`);
        tooltip.buttons.setButtons([
          {
            text: "确定",
            onclick: () => {
              const player = gui.selectedPlayers.list[0];
              NetworkEventCenter.emit(NetworkEventToS.USE_PING_HENG_TOS, {
                cardId: this.id,
                playerId: player.id,
                seq: gui.seq,
              });
              gui.gameLayer.stopSelectPlayers();
            },
          },
        ]);
      },
    });
  }

  onDeselected(gui: GameManager) {
    gui.gameLayer.stopSelectPlayers();
  }

  onEffect(): void {}
}
