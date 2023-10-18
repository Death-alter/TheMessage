import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { JianRen } from "../../Skill/SkillClass/JianRen";

export class WuZhiGuo extends Character {
  constructor() {
    super({
      id: 1,
      name: "吴志国",
      sprite: "images/characters/WuZhiGuo",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new JianRen(this)]);
  }
}
