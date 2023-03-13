import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class ShaoXiu extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 18,
      name: "邵秀",
      sprite: "images/characters/ShaoXiu",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
