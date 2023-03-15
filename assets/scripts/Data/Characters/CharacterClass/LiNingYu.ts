import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class LiNingYu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 28,
      name: "李宁玉",
      sprite: "images/characters/LiNingYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
