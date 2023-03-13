import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class BaiCangLang extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 6,
      name: "白沧浪",
      sprite: "images/characters/BaiCangLang",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
