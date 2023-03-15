import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class XiaoJiu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 27,
      name: "小九",
      sprite: "images/characters/XiaoJiu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
