import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { XiangJinSiSuo } from "../../Skill/SkillClass/XiangJinSiSuo";
import { QiangYingXiaLing } from "../../Skill/SkillClass/QiangYingXiaLing";

export class SunShouMo extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 48,
      name: "孙守谟",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new XiangJinSiSuo(this), new QiangYingXiaLing(this)]);
  }
}
