import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { MiaoBiQiaoBian } from "../../Skill/SkillClass/MiaoBiQiaoBian";

export class LianYuan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3,
      name: "连鸢",
      sprite: "images/characters/LianYuan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new MiaoBiQiaoBian(this)]);
  }
}
