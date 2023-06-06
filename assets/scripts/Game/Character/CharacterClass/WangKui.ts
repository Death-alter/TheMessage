import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { Yiyahuanya } from "../../Skill/SkillClass/Yiyahuanya";

export class WangKui extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 12,
      name: "王魁",
      sprite: "images/characters/WangKui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new Yiyahuanya()],
      gameObject: gameObject,
    });
  }
}
