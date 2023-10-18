import { Character } from "../Character";
import { Sex } from "../type";import { HouLaiRen } from "../../Skill/SkillClass/HouLaiRen";

export class DuanMuJingSP extends Character {
  constructor() {
    super({
      id: 1022,
      name: "SP端木静",
      sprite: "images/characters/DuanMuJingSP",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new HouLaiRen(this)]);
  }
}
