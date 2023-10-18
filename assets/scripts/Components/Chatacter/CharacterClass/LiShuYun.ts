import { Character } from "../Character";
import { Sex } from "../type";import { DingLun } from "../../Skill/SkillClass/DingLun";
import { ZhenLi } from "../../Skill/SkillClass/ZhenLi";

export class LiShuYun extends Character {
  constructor() {
    super({
      id: 43,
      name: "李书云",
      sprite: "images/characters/NoPanting_Famale",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new DingLun(this), new ZhenLi(this)]);
  }
}
