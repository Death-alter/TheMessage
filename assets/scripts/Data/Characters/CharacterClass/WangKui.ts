import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class WangKui extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 12,
      name: "王魁",
      sprite: "images/characters/WangKui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
