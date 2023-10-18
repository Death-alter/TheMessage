import { Character } from "../Character";
import { Sex } from "../type";
import { JiangHuLing } from "../../Skill/SkillClass/JiangHuLing";

export class WangFuGui extends Character {
  constructor() {
    super({
      id: 23,
      name: "王富贵",
      sprite: "images/characters/WangFuGui",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JiangHuLing(this)]);
  }
}
