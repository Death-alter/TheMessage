import { Character } from "../Character";
import { Sex } from "../type";import { CongRongYingDui } from "../../Skill/SkillClass/CongRongYingDui";

export class JianXianSheng extends Character {
  constructor() {
    super({
      id: 37,
      name: "简先生",
      sprite: "images/characters/JianXianSheng",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new CongRongYingDui(this)]);
  }
}
