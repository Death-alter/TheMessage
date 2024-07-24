import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";

export class UnknownCharacter extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 0,
      name: "未知角色",
      codeName: "",
      sprite: "images/characters/Unknown",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
  }
}
