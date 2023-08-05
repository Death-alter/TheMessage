import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";

export class UnknownCharacter extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 0,
      name: "未知角色",
      sprite: "images/characters/Unknown",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.UNKNOWN,
      gameObject: gameObject,
    });
  }
}
