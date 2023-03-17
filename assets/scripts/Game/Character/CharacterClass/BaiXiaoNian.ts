import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../../Data/Skills/Skill";
import { CharacterObject } from "../CharacterObject";

export class BaiXiaoNian extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 25,
      name: "白小年",
      sprite: "images/characters/BaiXiaoNian",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
