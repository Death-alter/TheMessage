import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YiHuaJieMu } from "../../Skill/SkillClass/YiHuaJieMu";

export class MaLiYa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 31,
      name: "玛利亚",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new YiHuaJieMu(this)]);
  }
}
