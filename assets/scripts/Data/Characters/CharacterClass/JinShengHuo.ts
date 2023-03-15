import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class JinShengHuo extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
