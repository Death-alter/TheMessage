import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { XianFaZhiRen } from "../../Skill/SkillClass/XianFaZhiRen";

export class QianMin extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 32,
      name: "钱敏",
      sprite: "images/characters/QianMin",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new XianFaZhiRen(this)]);
  }
}
