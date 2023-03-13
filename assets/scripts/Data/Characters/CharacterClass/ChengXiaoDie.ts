import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class ChengXiaoDie extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 2,
      name: "程小蝶",
      sprite: "images/characters/ChengXiaoDie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
