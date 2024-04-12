import { GamePhase } from "../../Manager/type";
import { Character } from "../../Components/Character/Character";
import { SkillButton } from "./SkillButton";

export interface SkillOption {
  name: string;
  description: string;
  character: Character;
  entity?: SkillButton;
}

export interface ActiveSkillOption extends SkillOption {
  useablePhase: GamePhase[];
}
