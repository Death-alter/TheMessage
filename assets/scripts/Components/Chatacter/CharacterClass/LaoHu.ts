import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YunChouWeiWo } from "../../Skill/SkillClass/YunChouWeiWo";

export class LaoHu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 38,
      name: "老虎",
      sprite: "images/characters/LaoHu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new YunChouWeiWo(this)]);
  }
}
