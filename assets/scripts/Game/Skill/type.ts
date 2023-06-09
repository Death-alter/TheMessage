import { GamePhase } from "../../GameManager/type";
import { Character } from "../Character/Character";
import { SkillButton } from "./SkillButton";

export interface SkillOption {
  name: string;
  description: string;
  character: Character;
  gameObject?: SkillButton;
}

export interface ActiveSkillOption extends SkillOption {
  useablePhase: GamePhase[];
}
