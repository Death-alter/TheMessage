import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skill/Skill";
import { CharacterObject } from "../CharacterObject";

export class UnknownCharacter extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 0,
      name: "未知角色",
      sprite: "images/characters/Unknown",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.UNKNOWN,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
