import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { HuoXin } from "../../Skill/SkillClass/HuoXin";

export class GaoQiaoZhiZi extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 36,
      name: "高桥智子",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      gameObject: gameObject,
    });
    this.setSkills([new HuoXin(this)]);
  }
}
