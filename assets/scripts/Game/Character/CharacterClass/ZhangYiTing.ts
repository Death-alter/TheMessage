import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class ZhangYiTing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 5,
      name: "张一挺",
      sprite: "images/characters/ZhangYiTing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
