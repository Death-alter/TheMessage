import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class ZhangYiTing extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 5,
      name: "张一挺",
      sprite: "images/characters/ZhangYiTing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
