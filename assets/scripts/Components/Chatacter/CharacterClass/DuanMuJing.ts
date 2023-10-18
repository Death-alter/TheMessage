import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { XinSiChao } from "../../Skill/SkillClass/XinSiChao";

export class DuanMuJing extends Character {
  constructor() {
    super({
      id: 22,
      name: "端木静",
      sprite: "images/characters/DuanMuJing",
      isHidden: false,
      sex: Sex.FAMALE,
    });
    this.setSkills([new XinSiChao(this)]);
  }
}
