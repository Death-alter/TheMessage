import { GameEvent } from "../../../Event/type";
import { ActiveSkill } from "../Skill";
import { Character } from "../../Characters/Character";
import { Player } from "../../Player/Player";
import { GamePhase } from "../../../GameManager/type";

export class JiZhi extends ActiveSkill {
  constructor(character: Character) {
    super({
      name: "急智",
      character: character,
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
      condition: [
        {
          event: GameEvent.CHARACTER_DYING,
          enabled() {
            return true;
          },
        },
        {
          event: GameEvent.GAME_PHASE_CHANGE,
          enabled(phase: GamePhase) {
            return phase === GamePhase.FIGHT_PHASE;
          },
        },
      ],
    });
  }

  onTrigger(player: Player): void {
    if (player.character === this.character) {
    }
  }

  onUse() {}

  enabled(playerId: number, phase: GamePhase): boolean {
    return phase === GamePhase.FIGHT_PHASE;
  }
}
