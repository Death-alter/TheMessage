import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { YuSiWangPo } from "../../Skill/SkillClass/YuSiWangPo";
import { PinMingSanLang } from "../../Skill/SkillClass/PinMingSanLang";

export class QinWuMing extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 42,
      name: "秦无命",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new PinMingSanLang(this), new YuSiWangPo(this)]);
  }
}
