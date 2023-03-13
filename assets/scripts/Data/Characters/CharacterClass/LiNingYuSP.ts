import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class LiNingYuSP extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
