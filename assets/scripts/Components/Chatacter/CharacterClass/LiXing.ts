import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { SouJi } from "../../Skill/SkillClass/SouJi";

export class LiXing extends Character {
  constructor() {
    super({
      id: 11,
      name: "李醒",
      sprite: "images/characters/LiXing",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new SouJi(this)]);
  }
}
