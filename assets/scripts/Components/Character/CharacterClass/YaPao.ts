import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { ShouKouRuPing } from "../../Skill/SkillClass/ShouKouRuPing";
import { HanHouLaoShi } from "../../Skill/SkillClass/HanHouLaoShi";

export class YaPao extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 40,
      name: "哑炮",
      sprite: "images/characters/YaPao",
      status: CharacterStatus.FACE_UP,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new ShouKouRuPing(this), new HanHouLaoShi(this)]);
  }
}
