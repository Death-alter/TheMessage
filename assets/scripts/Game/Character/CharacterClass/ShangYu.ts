import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JieDaoShaRen } from "../../Skill/SkillClass/JieDaoShaRen";

export class ShangYu extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 30,
      name: "商玉",
      sprite: "images/characters/ShangYu",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new JieDaoShaRen(this)]);
  }
}
