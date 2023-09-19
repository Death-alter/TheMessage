import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterObject } from "../CharacterObject";
import { ShouKouRuPing } from "../../Skill/SkillClass/ShouKouRuPing";
import { HanHouLaoShi } from "../../Skill/SkillClass/HanHouLaoShi";

export class YaBa extends Character {
  constructor(gameObject?: CharacterObject) {
    super({
      id: 40,
      name: "哑巴",
      sprite: "images/characters/NoPanting",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      gameObject: gameObject,
    });
    this.setSkills([new ShouKouRuPing(this), new HanHouLaoShi(this)]);
  }
}
