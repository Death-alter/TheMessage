import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { JieCheYunHuo } from "../../Skill/SkillClass/JieCheYunHuo";
import { GongRenYouZhiShi } from "../../Skill/SkillClass/GongRenYouZhiShi";

export class HuoCheSiJi extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 46,
      name: "火车司机",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new JieCheYunHuo(this), new GongRenYouZhiShi(this)]);
  }
}
