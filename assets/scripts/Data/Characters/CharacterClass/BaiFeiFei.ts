import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class BaiFeiFei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 21,
      name: "白菲菲",
      sprite: "images/characters/BaiFeiFei",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
