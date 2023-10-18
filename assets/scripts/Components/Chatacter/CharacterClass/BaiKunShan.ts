import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { DuJi } from "../../Skill/SkillClass/DuJi";

export class BaiKunShan extends Character {
  constructor() {
    super({
      id: 29,
      name: "白昆山",
      sprite: "images/characters/BaiKunShan",
      isHidden: true,
      sex: Sex.MALE,
    });
    this.setSkills([new DuJi(this)]);
  }
}
