import { Character } from "../Character";
import { Sex } from "../type";import { MiaoShou } from "../../Skill/SkillClass/MiaoShou";

export class AFuLuoLa extends Character {
  constructor() {
    super({
      id: 13,
      name: "阿芙罗拉",
      sprite: "images/characters/AFuLuoLa",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new MiaoShou(this)]);
  }
}
