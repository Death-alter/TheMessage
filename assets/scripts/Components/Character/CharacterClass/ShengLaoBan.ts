import { Character } from "../Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { RuBiZhiShi } from "../../Skill/SkillClass/RuBiZhiShi";
import { ShenCang } from "../../Skill/SkillClass/ShenCang";

export class ShengLaoBan extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 35,
      name: "盛老板",
      sprite: "images/characters/ShengLaoBan",
      status: CharacterStatus.FACE_DOWN,
      sex: Sex.MALE,
      entity: entity,
    });
    this.setSkills([new RuBiZhiShi(this), new ShenCang(this)]);
  }
}
