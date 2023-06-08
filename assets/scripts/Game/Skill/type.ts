import { GamePhase } from "../../GameManager/type";
import { SkillButton } from "./SkillButton";

export interface SkillOption {
  name: string;
  description: string;
  gameObject?: SkillButton;
}

export interface ActiveSkillOption extends SkillOption {
  useablePhase: GamePhase[];
}
