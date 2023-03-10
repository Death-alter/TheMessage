import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";

export class LaoBie extends Character {
  constructor() {
    super({
      id: 26,
      name: "老鳖",
      sprite: "images/characters/LaoBie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
    });
  }
}
