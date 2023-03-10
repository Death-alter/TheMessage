import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class ShaoXiu extends Character {
  constructor() {
    super({
      id: 18,
      name: "邵秀",
      sprite: "images/characters/ShaoXiu",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
    });
  }
}
