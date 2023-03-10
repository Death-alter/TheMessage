import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class JinShengHuo extends Character {
  constructor() {
    super({
      id: 19,
      name: "金生火",
      sprite: "images/characters/JinShengHuo",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
