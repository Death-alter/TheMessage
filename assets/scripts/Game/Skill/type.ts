import { GameEvent } from "../../Event/type";
import { Character } from "../Character/Character";

export const enum SkillType {
  PASSIVE = 0,
  ACTIVE = 1,
}

interface SkillOptionBasic {
  name: string;
  character: Character;
  description: string;
}

export interface SkillOption extends SkillOptionBasic {
  type: SkillType;
}

export interface ActiveSkillOption extends SkillOptionBasic {
  condition: SkillCondition[];
}

export interface PassiveSkillOption extends SkillOptionBasic {}

export interface SkillCondition {
  event: GameEvent;
  enabled: (...args: any[]) => boolean;
}
