import { Character } from "../Character";
import { Sex } from "../type";import { JieCheYunHuo } from "../../Skill/SkillClass/JieCheYunHuo";
import { GongRenYouZhiShi } from "../../Skill/SkillClass/GongRenYouZhiShi";

export class HuoCheSiJi extends Character {
  constructor() {
    super({
      id: 49,
      name: "火车司机",
      sprite: "images/characters/NoPanting",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JieCheYunHuo(this), new GongRenYouZhiShi(this)]);
  }
}
