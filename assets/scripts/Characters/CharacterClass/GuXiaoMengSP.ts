import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class GuXiaoMengSP extends Character {
  constructor() {
    super({
      id: 1028,
      name: "SP顾小梦",
      sprite: "images/characters/GuXiaoMengSP",
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
