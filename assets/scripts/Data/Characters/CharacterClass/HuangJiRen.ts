import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterPanting } from "../../../UI/Game/Character/CharacterPanting";

export class HuangJiRen extends Character {
  constructor(UI?: CharacterPanting) {
    super({
      id: 9,
      name: "黄济仁",
      sprite: "images/characters/HuangJiRen",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
      UI: UI,
    });
  }
}
