import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { DuiZhengXiaoYao } from "../../Skill/SkillClass/DuiZhengXiaoYao";

export class HuangJiRen extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 9,
      name: "黄济仁",
      sprite: "images/characters/HuangJiRen",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new DuiZhengXiaoYao(this)]);
  }
}
