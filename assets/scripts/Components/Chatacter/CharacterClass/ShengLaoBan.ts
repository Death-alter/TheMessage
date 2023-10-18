import { Character } from "../Character";
import { Sex } from "../type";
import { RuBiZhiShi } from "../../Skill/SkillClass/RuBiZhiShi";
import { ShenCang } from "../../Skill/SkillClass/ShenCang";

export class ShengLaoBan extends Character {
  constructor() {
    super({
      id: 35,
      name: "盛老板",
      sprite: "images/characters/ShengLaoBan",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new RuBiZhiShi(this), new ShenCang(this)]);
  }
}
