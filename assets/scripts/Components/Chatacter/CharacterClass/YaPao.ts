import { Character } from "../Character";
import { Sex } from "../type";
import { ShouKouRuPing } from "../../Skill/SkillClass/ShouKouRuPing";
import { HanHouLaoShi } from "../../Skill/SkillClass/HanHouLaoShi";

export class YaPao extends Character {
  constructor() {
    super({
      id: 40,
      name: "哑炮",
      sprite: "images/characters/YaPao",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new ShouKouRuPing(this), new HanHouLaoShi(this)]);
  }
}
