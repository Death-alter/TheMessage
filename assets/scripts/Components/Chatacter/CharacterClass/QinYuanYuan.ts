import { Character } from "../Character";
import { Sex } from "../type";
import { ZuoYouFengYuan } from "../../Skill/SkillClass/ZuoYouFengYuan";
import { BiYiShuangFei } from "../../Skill/SkillClass/BiYiShuangFei";

export class QinYuanYuan extends Character {
  constructor() {
    super({
      id: 34,
      name: "秦圆圆",
      sprite: "images/characters/QinYuanYuan",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new ZuoYouFengYuan(this), new BiYiShuangFei(this)]);
  }
}
