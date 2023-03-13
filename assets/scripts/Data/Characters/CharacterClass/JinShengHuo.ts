import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class JinShengHuo extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
