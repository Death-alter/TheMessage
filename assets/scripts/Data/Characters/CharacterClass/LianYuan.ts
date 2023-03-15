import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class LianYuan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3,
      name: "连鸢",
      sprite: "images/characters/LianYuan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
