import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class SPGuXiaoMeng extends Character {
  constructor() {
    super({
      id: 1028,
      name: "SP顾小梦",
      spirit: "images/characters/GuXiaoMengSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
