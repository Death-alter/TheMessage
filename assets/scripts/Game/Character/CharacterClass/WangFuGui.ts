import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JiangHuLing } from "../../Skill/SkillClass/JiangHuLing";

export class WangFuGui extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 23,
      name: "王富贵",
      sprite: "images/characters/WangFuGui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new JiangHuLing(this)]);
  }
}
