import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YuSiWangPo } from "../../Skill/SkillClass/YuSiWangPo";

export class SiShi extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 42,
      name: "死士",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new YuSiWangPo(this)]);
  }
}
