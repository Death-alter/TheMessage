import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class LaoHan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 24,
      name: "老汉",
      sprite: "images/characters/LaoHan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
