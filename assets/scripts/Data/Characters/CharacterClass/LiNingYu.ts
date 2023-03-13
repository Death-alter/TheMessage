import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class LiNingYu extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 28,
      name: "李宁玉",
      sprite: "images/characters/LiNingYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
