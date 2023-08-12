import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { RuBiZhiShi } from "../../Skill/SkillClass/RuBiZhiShi";
import { ShenCang } from "../../Skill/SkillClass/ShenCang";

export class ShengLaoBan extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 35,
      name: "盛老板",
      sprite: "images/characters/ShengLaoBan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new RuBiZhiShi(this), new ShenCang(this)]);
  }
}
