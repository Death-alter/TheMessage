import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { JiBan } from "../../Skill/SkillClass/JiBan";

export class GuXiaoMengSP extends Character {
  constructor() {
    super({
      id: 1020,
      name: "SP顾小梦",
      sprite: "images/characters/GuXiaoMengSP",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new JiBan(this)]);
  }
}
