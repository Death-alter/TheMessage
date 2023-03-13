import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class BaiKunShan extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 29,
      name: "白昆山",
      sprite: "images/characters/BaiKunShan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
