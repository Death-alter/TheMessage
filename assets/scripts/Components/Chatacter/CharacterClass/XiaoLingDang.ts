import { Character } from "../Character";
import { Sex } from "../type";
import { XinGeLianLuo } from "../../Skill/SkillClass/XinGeLianLuo";
import { HouZiQieXin } from "../../Skill/SkillClass/HouZiQieXin";

export class XiaoLingDang extends Character {
  constructor() {
    super({
      id: 45,
      name: "小铃铛",
      sprite: "images/characters/NoPanting_Famale",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new XinGeLianLuo(this), new HouZiQieXin(this)]);
  }
}
