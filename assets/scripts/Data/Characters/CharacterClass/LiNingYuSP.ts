import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class LiNingYuSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
