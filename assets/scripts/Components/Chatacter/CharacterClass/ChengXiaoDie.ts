import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { ZhiYin } from "../../Skill/SkillClass/ZhiYin";
import { JingMeng } from "../../Skill/SkillClass/JingMeng";

export class ChengXiaoDie extends Character {
  constructor() {
    super({
      id: 2,
      name: "程小蝶",
      sprite: "images/characters/ChengXiaoDie",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new ZhiYin(this), new JingMeng(this)]);
  }
}
