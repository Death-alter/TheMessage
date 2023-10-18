import { Character } from "../Character";
import { Sex } from "../type";import { GongFen } from "../../Skill/SkillClass/GongFen";

export class ChengXiaoDieSP extends Character {
  constructor() {
    super({
      id: 1002,
      name: "SP程小蝶",
      sprite: "images/characters/ChengXiaoDieSP",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new GongFen(this)]);
  }
}
