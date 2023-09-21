import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { TaoQu } from "../../Skill/SkillClass/TaoQu";

export class SPYBaiFeiFei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 3021,
      name: "间谍白菲菲",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new TaoQu(this)]);
  }
}
