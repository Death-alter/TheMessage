import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { Skill } from "../../Skills/Skill";
import { CharacterObject } from "../../../GameObject/Character/CharacterObject";

export class PeiLing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 8,
      name: "裴玲",
      sprite: "images/characters/PeiLing",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      skills: [] as Skill[],
      gameObject: gameObject,
    });
  }
}
