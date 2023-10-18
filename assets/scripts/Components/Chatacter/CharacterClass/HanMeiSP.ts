import { Character } from "../Character";
import { Sex } from "../type";import { LengXueXunLian } from "../../Skill/SkillClass/LengXueXunLian";

export class HanMeiSP extends Character {
  constructor() {
    super({
      id: 1014,
      name: "SP韩梅",
      sprite: "images/characters/HanMeiSP",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new LengXueXunLian(this)]);
  }
}
