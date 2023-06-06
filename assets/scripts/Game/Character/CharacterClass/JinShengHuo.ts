import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JinShen } from "../../Skill/SkillClass/JinShen";

export class JinShengHuo extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [new JinShen()],
      gameObject: gameObject,
    });
  }
}
