import { GameData } from "../../../UI/Game/GameWindow/GameData";
import { Card } from "../Card";
import { CardDefaultOption, CardOnEffectParams, CardType } from "../type";
import { GamePhase } from "../../../GameManager/type";

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
