import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { SouJi } from "../../Skill/SkillClass/SouJi";

export class LiXing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 11,
      name: "李醒",
      sprite: "images/characters/LiXing",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new SouJi(this)]);
  }
}
