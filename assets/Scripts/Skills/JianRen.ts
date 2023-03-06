import { TriggeringSkill } from "./Skill";
import { TriggeringSkillOption } from "./types";
import { Character } from "../Characters/Character";

export class JianRen extends TriggeringSkill {
  constructor(option: TriggeringSkillOption) {
    super({
      character: option.character,
      triggerEvent: "accept_black_message",
    });
  }

  onUse(): void {
    
  }
}
