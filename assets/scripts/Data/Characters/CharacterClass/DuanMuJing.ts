import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class DuanMuJing extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 22,
      name: "端木静",
      sprite: "images/characters/DuanMuJing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
