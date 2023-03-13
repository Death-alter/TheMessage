import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class MaoBuBa extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 4,
      name: "毛不拔",
      sprite: "images/characters/MaoBuBa",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
