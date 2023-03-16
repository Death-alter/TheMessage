import { PassiveSkill } from "./Skill";
import { SkillOption } from "./type";

export class LianLuo extends PassiveSkill {
  constructor(option: SkillOption) {
    super({
      name: "联络",
      character: option.character,
      description:
        "你传出情报时，可以将情报牌上的箭头视作任意方向。",
    });
  }
}
