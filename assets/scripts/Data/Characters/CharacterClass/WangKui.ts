import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class WangKui extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 12,
      name: "王魁",
      sprite: "images/characters/WangKui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
