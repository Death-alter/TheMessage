import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";

export class SPYBaiFeiFei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3021,
      name: "白菲菲",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([]);
  }
}
