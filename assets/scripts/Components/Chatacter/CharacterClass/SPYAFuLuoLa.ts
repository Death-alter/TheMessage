import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";

export class SPYAFuLuoLa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3013,
      name: "间谍阿芙罗拉",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([]);
  }
}
