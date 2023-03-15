import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class AFuLuoLa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 13,
      name: "阿芙罗拉",
      sprite: "images/characters/AFuLuoLa",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
