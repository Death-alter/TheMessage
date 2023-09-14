import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { MiXin } from "../../Skill/SkillClass/MiXin";
import { ZhengDuo } from "../../Skill/SkillClass/ZhengDuo";

export class AdultHanMei extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 2014,
      name: "成年韩梅",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new MiXin(this), new ZhengDuo(this)]);
  }
}
