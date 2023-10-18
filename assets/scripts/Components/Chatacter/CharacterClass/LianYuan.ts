import { Character } from "../../../Components/Chatacter/Character";
import { Sex } from "../type";import { MiaoBiQiaoBian } from "../../Skill/SkillClass/MiaoBiQiaoBian";

export class LianYuan extends Character {
  constructor() {
    super({
      id: 3,
      name: "连鸢",
      sprite: "images/characters/LianYuan",
      isHidden: true,
      sex: Sex.FAMALE,
    });
    this.setSkills([new MiaoBiQiaoBian(this)]);
  }
}
