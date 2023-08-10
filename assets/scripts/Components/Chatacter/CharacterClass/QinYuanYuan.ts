import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ZuoYouFengYuan } from "../../Skill/SkillClass/ZuoYouFengYuan";
import { BiYiShuangFei } from "../../Skill/SkillClass/BiYiShuangFei";

export class QinYuanYuan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 34,
      name: "秦圆圆",
      sprite: "images/characters/QinYuanYuan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new ZuoYouFengYuan(this), new BiYiShuangFei(this)]);
  }
}
