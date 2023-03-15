import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class MaoBuBa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 4,
      name: "毛不拔",
      sprite: "images/characters/MaoBuBa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
