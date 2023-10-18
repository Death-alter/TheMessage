import { Character } from "../Character";
import { Sex } from "../type";
import { XiangJinSiSuo } from "../../Skill/SkillClass/XiangJinSiSuo";
import { QiangYingXiaLing } from "../../Skill/SkillClass/QiangYingXiaLing";

export class SunShouMo extends Character {
  constructor() {
    super({
      id: 48,
      name: "孙守谟",
      sprite: "images/characters/NoPanting",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new XiangJinSiSuo(this), new QiangYingXiaLing(this)]);
  }
}
