import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { QiHuoKeJu } from "../../Skill/SkillClass/QiHuoKeJu";

export class MaoBuBa extends Character {
  constructor() {
    super({
      id: 4,
      name: "毛不拔",
      sprite: "images/characters/MaoBuBa",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new QiHuoKeJu(this)]);
  }
}
