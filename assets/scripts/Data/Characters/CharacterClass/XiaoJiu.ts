import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class XiaoJiu extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 27,
      name: "小九",
      sprite: "images/characters/XiaoJiu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
