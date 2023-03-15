import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class XuanQingZi extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 16,
      name: "玄青子",
      sprite: "images/characters/XuanQingZi",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
