import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";
import { Tooltip } from "../../../GameManager/Tooltip";

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

  onSelectedToPlay(gameData: GameData, tooltip: Tooltip): void {}
  
  enabledToPlay(gameData: GameData): boolean {
    return true;
  }


  onConfirmPlay(gameData: GameData) {
    console.log(this);
  }


  onPlay() {
    super.onPlay();
  }

  onEffect(): void {}
}
