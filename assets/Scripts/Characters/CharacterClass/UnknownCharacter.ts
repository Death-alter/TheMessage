import { Character } from "../Character";
import { Sex, CharacterStatus } from "../types";
import { Skill } from "../../Skills/Skill";

export class UnknownCharacter extends Character {
  constructor() {
    super({
      id: 0,
      name: "未知角色",
      spirit: "images/characters/Unknown",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.UNKNOWN,
      skills: [] as Skill[],
    });
  }
}
