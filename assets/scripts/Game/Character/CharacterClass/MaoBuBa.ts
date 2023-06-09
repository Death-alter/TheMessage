import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { QiHuoKeJu } from "../../Skill/SkillClass/QiHuoKeJu";

export class MaoBuBa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 4,
      name: "毛不拔",
      sprite: "images/characters/MaoBuBa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new QiHuoKeJu(this)]);
  }
}
