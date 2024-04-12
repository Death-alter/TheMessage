import { Character } from "../../../Components/Character/Character";
import { Sex, CharacterStatus } from "../type";
import { CharacterEntity } from "../CharacterEntity";
import { LianMin } from "../../Skill/SkillClass/LianMin";
import { FuHei } from "../../Skill/SkillClass/FuHei";

export class BaiFeiFei extends Character {
  constructor(entity?: CharacterEntity) {
    super({
      id: 21,
      name: "白菲菲",
      sprite: "images/characters/BaiFeiFei",
      status: CharacterStatus.FACE_UP,
      sex: Sex.FAMALE,
      entity: entity,
    });
    this.setSkills([new LianMin(this), new FuHei(this)]);
  }
}
