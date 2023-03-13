import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class WangTianXiang extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 10,
      name: "王田香",
      sprite: "images/characters/WangTianXiang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
