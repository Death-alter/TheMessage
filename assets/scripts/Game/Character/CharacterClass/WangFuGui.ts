import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class WangFuGui extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 23,
      name: "王富贵",
      sprite: "images/characters/WangFuGui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
