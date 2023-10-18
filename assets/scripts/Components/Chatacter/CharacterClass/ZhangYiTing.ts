import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { QiangLing } from "../../Skill/SkillClass/QiangLing";

export class ZhangYiTing extends Character {
  constructor() {
    super({
      id: 5,
      name: "张一挺",
      sprite: "images/characters/ZhangYiTing",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new QiangLing(this)]);
  }
}
