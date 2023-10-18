import { Character } from "../Character";
import { Sex } from "../type";import { TaoQu } from "../../Skill/SkillClass/TaoQu";

export class BaiFeiFeiSP extends Character {
  constructor() {
    super({
      id: 1021,
      name: "SP白菲菲",
      sprite: "images/characters/BaiFeiFeiSP",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new TaoQu(this)]);
  }
}
