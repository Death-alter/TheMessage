import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class PeiLing extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 8,
      name: "裴玲",
      sprite: "images/characters/PeiLing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
