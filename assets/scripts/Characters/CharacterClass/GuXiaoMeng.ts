import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class GuXiaoMeng extends Character {
  constructor() {
    super({
      id: 28,
      name: "顾小梦",
      spirit: "images/characters/GuXiaoMeng",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
