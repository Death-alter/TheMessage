import { Character } from "../Character";
import { Sex } from "../type";
import { XianFaZhiRen } from "../../Skill/SkillClass/XianFaZhiRen";

export class QianMin extends Character {
  constructor() {
    super({
      id: 32,
      name: "钱敏",
      sprite: "images/characters/QianMin",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new XianFaZhiRen(this)]);
  }
}
