import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ChiZiZhiXin } from "../../Skill/SkillClass/ChiZiZhiXin";

export class XiaoJiuSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1027,
      name: "SP小九",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ChiZiZhiXin(this)]);
  }
}
