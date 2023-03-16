import { GameEvent } from "../../Event/type";
import { A_T_Skill } from "./Skill";
import { SkillOption } from "./type";
import { Player } from "../Player/Player";
import { GamePhase } from "../../Game/type";

export class JiZhi extends A_T_Skill {
  constructor(option: SkillOption) {
    super({
      name: "急智",
      character: option.character,
      description: "一名角色濒死时，或争夺阶段，你可以翻开此角色牌，然后摸四张牌。",
      triggerEvent: [GameEvent.ACCEPT_BLACK_MESSAGE],
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
