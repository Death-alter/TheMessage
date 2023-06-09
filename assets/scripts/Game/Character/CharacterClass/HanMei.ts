import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YiHuaJieMu } from "../../Skill/SkillClass/YiHuaJieMu";

export class HanMei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 14,
      name: "韩梅",
      sprite: "images/characters/HanMei",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new YiHuaJieMu(this)]);
  }
}
