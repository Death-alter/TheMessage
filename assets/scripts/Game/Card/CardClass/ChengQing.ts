import { GameEventCenter, NetworkEventCenter } from "../../../Event/EventTarget";
import { GameEvent, NetworkEventToS } from "../../../Event/type";
import { Tooltip } from "../../../GameManager/Tooltip";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
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

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {}

  enabledToPlay(gameData: GameData): boolean {
    return true;
  }

  onConfirmPlay(gameData: GameData, tooltip: Tooltip,) {
    const data: any = {
      cardId: this.id,
    };
    gameData.gameObject.selectedPlayers.limit = 1;
    tooltip.setText("请选择要澄清的目标");
    tooltip.buttons.setButtons([
      {
        text: "确定",
        onclick: () => {
          NetworkEventCenter.emit(NetworkEventToS.USE_CHENG_QING_TOS, data);
          gameData.gameObject.selectedPlayers.limit = 0;
        },
        enabled: () => {
          return gameData.gameObject.selectedPlayers.list.length === 1;
        },
      },
      {
        text: "取消",
        onclick: () => {
          gameData.gameObject.selectedPlayers.limit = 0;
          // restore();
        },
      },
    ]);
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
