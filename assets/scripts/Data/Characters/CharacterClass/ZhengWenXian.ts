import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class ZhengWenXian extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 15,
      name: "鄭文先",
      sprite: "images/characters/ZhengWenXian",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
