import { Character } from "../Character";
import { Sex } from "../type";
import { ChiZiZhiXin } from "../../Skill/SkillClass/ChiZiZhiXin";

export class XiaoJiuSP extends Character {
  constructor() {
    super({
      id: 1027,
      name: "SP小九",
      sprite: "images/characters/XiaoJiuSP",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new ChiZiZhiXin(this)]);
  }
}
