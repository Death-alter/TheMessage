import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { YiYaHuanYa } from "../../Skill/SkillClass/Yiyahuanya";

export class WangKui extends Character {
  constructor() {
    super({
      id: 12,
      name: "王魁",
      sprite: "images/characters/WangKui",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new YiYaHuanYa(this)]);
  }
}
