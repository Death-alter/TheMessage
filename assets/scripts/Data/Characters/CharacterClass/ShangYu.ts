import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class ShangYu extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 30,
      name: "商玉",
      sprite: "images/characters/ShangYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
