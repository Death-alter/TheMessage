import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class WangTianXiang extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 10,
      name: "王田香",
      sprite: "images/characters/WangTianXiang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
