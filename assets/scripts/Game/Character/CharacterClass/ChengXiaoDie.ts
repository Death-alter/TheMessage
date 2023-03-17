import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class ChengXiaoDie extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 2,
      name: "程小蝶",
      sprite: "images/characters/ChengXiaoDie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
