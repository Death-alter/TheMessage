import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class LianYuan extends Character {
  constructor() {
    super({
      id: 3,
      name: "连鸢",
      sprite: "images/characters/LianYuan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
