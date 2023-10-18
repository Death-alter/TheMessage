import { Character } from "../Character";
import { Sex } from "../type";import { TanQiuZhenLi } from "../../Skill/SkillClass/TanQiuZhenLi";

export class LianYuanSP extends Character {
  constructor() {
    super({
      id: 1003,
      name: "SP连鸢",
      sprite: "images/characters/LianYuanSP",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new TanQiuZhenLi(this)]);
  }
}
