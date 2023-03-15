import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class GuXiaoMengSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1028,
      name: "SP顾小梦",
      sprite: "images/characters/GuXiaoMengSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
