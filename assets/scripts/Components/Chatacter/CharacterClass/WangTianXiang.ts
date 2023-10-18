import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { JinBi } from "../../Skill/SkillClass/JinBi";

export class WangTianXiang extends Character {
  constructor() {
    super({
      id: 10,
      name: "王田香",
      sprite: "images/characters/WangTianXiang",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JinBi(this)]);
  }
}
