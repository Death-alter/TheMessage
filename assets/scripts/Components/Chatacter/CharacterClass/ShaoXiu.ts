import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";
import { MianLiCangZhen } from "../../Skill/SkillClass/MianLiCangZhen";

export class ShaoXiu extends Character {
  constructor() {
    super({
      id: 18,
      name: "邵秀",
      sprite: "images/characters/ShaoXiu",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new MianLiCangZhen(this)]);
  }
}
