import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ShouKouRuPing } from "../../Skill/SkillClass/ShouKouRuPing";
import { HanHouLaoShi } from "../../Skill/SkillClass/HanHouLaoShi";

export class YaPao extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 40,
      name: "哑炮",
      sprite: "images/characters/YaPao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ShouKouRuPing(this), new HanHouLaoShi(this)]);
  }
}
