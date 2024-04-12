import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";

export class UnknownCharacter extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 0,
      name: "未知角色",
      sprite: "images/characters/Unknown",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.UNKNOWN,
      entity: entity,
    });
  }
}
