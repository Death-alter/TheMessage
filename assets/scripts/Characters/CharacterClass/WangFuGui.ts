import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class WangFuGui extends Character {
  constructor() {
    super({
      id: 23,
      name: "王富贵",
      sprite: "images/characters/WangFuGui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
