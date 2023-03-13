import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class LaoHan extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 24,
      name: "老汉",
      sprite: "images/characters/LaoHan",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
