import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class LiNingYuSP extends Character {
  constructor() {
    super({
      id: 1028,
      name: "SP李宁玉",
      sprite: "images/characters/LiNingYuSP",
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
