import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { LianLuo } from "../../Skill/SkillClass/LianLuo";
import { MingEr } from "../../Skill/SkillClass/MingEr";

export class LaoBie extends Character {
  constructor() {
    super({
      id: 26,
      name: "老鳖",
      sprite: "images/characters/LaoBie",
      isHidden: false,
      sex: Sex.MALE,
    });
    this.setSkills([new LianLuo(this), new MingEr(this)]);
  }
}
