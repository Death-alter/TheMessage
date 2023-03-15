import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class ShangYu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 30,
      name: "商玉",
      sprite: "images/characters/ShangYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
