import { Character } from "../Character";
import { Sex } from "../type";
import { CangShenJiaoTang } from "../../Skill/SkillClass/CangShenJiaoTang";

export class MaLiYa extends Character {
  constructor() {
    super({
      id: 31,
      name: "玛利亚",
      sprite: "images/characters/MaLiYa",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new CangShenJiaoTang(this)]);
  }
}
