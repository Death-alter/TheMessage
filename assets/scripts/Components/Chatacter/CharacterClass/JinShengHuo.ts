import { Character } from "../Character";
import { Sex } from "../type";import { JinShen } from "../../Skill/SkillClass/JinShen";

export class JinShengHuo extends Character {
  constructor() {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JinShen(this)]);
  }
}
