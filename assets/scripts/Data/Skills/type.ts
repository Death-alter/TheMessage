import { GameEvent } from "../../Event/type";
import { Character } from "../Characters/Character";

export const enum SkillType {
  PASSIVE = 0,
  ACTIVE = 1,
  TRIGGERING = 2,
}

export interface SkillOption {
  name: string;
  character: Character;
  description: string;
  type?: SkillType;
}

export interface TriggeringSkillOption {
  name: string;
  character: Character;
  description: string;
  triggerEvent: GameEvent[];
}
