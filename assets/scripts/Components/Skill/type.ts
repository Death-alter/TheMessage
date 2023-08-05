import { GamePhase } from "../../Manager/type";
import { Character } from "../../Components/Chatacter/Character";
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
