import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class ZhengWenXian extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 15,
      name: "鄭文先",
      sprite: "images/characters/ZhengWenXian",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
