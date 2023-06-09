import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { NetworkEventToS, ProcessEvent } from "../../../Event/type";
import { ProcessEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";

export class PingHeng extends Card {
  public readonly availablePhases = [GamePhase.MAIN_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "平衡",
      type: CardType.PING_HENG,
      sprite: "images/cards/PingHeng",
      direction: option.direction,
      color: option.color,
      lockable: option.lockable,
      status: option.status,
      gameObject: option.gameObject,
    });
  }

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {
    tooltip.setText(`请选择平衡的目标`);
    gameData.gameObject.startSelectPlayer({
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
              const card = gameData.gameObject.handCardList.selectedCards.list[0];
              const player = gameData.gameObject.selectedPlayers.list[0];
              NetworkEventCenter.emit(NetworkEventToS.USE_PING_HENG_TOS, {
                cardId: card.id,
                playerId: player.id,
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

  onEffect(): void {}
}
