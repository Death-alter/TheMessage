import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class BaiKunShan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 29,
      name: "白昆山",
      sprite: "images/characters/BaiKunShan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
