import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class FeiYuanLongChuan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 7,
      name: "肥圆龙川",
      sprite: "images/characters/FeiYuanLongChuan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
