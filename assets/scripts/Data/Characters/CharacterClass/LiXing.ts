import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class LiXing extends Character {
  constructor() {
    super({
      id: 11,
      name: "李醒",
      sprite: "images/characters/LiXing",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
