import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { GongFen } from "../../Skill/SkillClass/GongFen";

export class ChengXiaoDieSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1002,
      name: "SP程小蝶",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new GongFen(this)]);
  }
}
