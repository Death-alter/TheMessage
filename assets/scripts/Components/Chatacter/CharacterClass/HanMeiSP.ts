import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { LengXueXunLian } from "../../Skill/SkillClass/LengXueXunLian";

export class HanMeiSP extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 1014,
      name: "SP韩梅",
      sprite: "images/characters/HanMeiSP",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new LengXueXunLian(this)]);
  }
}
