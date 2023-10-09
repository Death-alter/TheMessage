import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { TaoQu } from "../../Skill/SkillClass/TaoQu";

export class BaiFeiFeiSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1021,
      name: "SP白菲菲",
      sprite: "images/characters/BaiFeiFeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new TaoQu(this)]);
  }
}
