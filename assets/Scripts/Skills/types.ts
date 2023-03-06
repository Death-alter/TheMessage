import { Character } from "../Characters/Character";

export enum SkillType {
  PASSIVE = 0,
  ACTIVE = 1,
  TRIGGERING = 2,
}

export interface SkillOption {
  character: Character;
  type: SkillType;
}

export interface TriggeringSkillOption {
  character: Character;
  triggerEvent: string;
}
