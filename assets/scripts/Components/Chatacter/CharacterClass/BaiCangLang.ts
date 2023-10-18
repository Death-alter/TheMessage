import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { BoAi } from "../../Skill/SkillClass/BoAi";

export class BaiCangLang extends Character {
  constructor() {
    super({
      id: 6,
      name: "白沧浪",
      sprite: "images/characters/BaiCangLang",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new BoAi(this)]);
  }
}
