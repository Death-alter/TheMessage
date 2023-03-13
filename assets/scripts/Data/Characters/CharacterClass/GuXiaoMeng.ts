import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class GuXiaoMeng extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 28,
      name: "顾小梦",
      sprite: "images/characters/GuXiaoMeng",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
