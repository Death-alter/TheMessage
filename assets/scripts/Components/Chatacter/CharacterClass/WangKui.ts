import { Character } from "../../../Components/Chatacter/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YiYaHuanYa } from "../../Skill/SkillClass/Yiyahuanya";

export class WangKui extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 12,
      name: "王魁",
      sprite: "images/characters/WangKui",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new YiYaHuanYa(this)]);
  }
}
