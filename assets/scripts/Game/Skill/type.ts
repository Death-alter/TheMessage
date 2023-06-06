import { GamePhase } from "../../GameManager/type";

export interface SkillOption {
  name: string;
  description: string;
}

export interface ActiveSkillOption extends SkillOption {
  useablePhase: GamePhase[];
}
