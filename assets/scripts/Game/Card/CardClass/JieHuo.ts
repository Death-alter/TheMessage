import { Tooltip } from "../../../GameManager/Tooltip";
import { GamePhase } from "../../../GameManager/type";
import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";

export class JieHuo extends Card {
  public readonly availablePhases = [GamePhase.FIGHT_PHASE];

  constructor(option: CardDefaultOption) {
    super({
      id: option.id,
      name: "截获",
      type: CardType.JIE_HUO,
      sprite: "images/cards/JieHuo",
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

  onEffect(gameData: GameData, { targetPlayerId }: CardOnEffectParams) {
    gameData.messagePlayerId = targetPlayerId;
  }
}
