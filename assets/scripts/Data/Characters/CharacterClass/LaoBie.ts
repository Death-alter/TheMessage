import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class LaoBie extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 26,
      name: "老鳖",
      sprite: "images/characters/LaoBie",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
