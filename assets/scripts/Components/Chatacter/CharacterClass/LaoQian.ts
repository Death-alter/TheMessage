import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { DuMing } from "../../Skill/SkillClass/DuMing";

export class LaoQian extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 41,
      name: "老千",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new DuMing(this)]);
  }
}
