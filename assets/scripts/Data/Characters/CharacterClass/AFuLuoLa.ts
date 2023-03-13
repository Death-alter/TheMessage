import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class AFuLuoLa extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 13,
      name: "阿芙罗拉",
      sprite: "images/characters/AFuLuoLa",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
